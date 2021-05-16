const express = require('express')
const { getUsers, userExists } = require('../datasources/users')
const { getUserDiary } = require('../datasources/userDiaries')
const { getDiaryBadges, getDiaryHumour } = require('../badges/diaryBadges')
const {
    getValueFromCache,
    setValueToCache,
    getCacheKeys,
} = require('../cache.js')
const httpProxyMiddleware = require('http-proxy-middleware')
const { createProxyMiddleware } = httpProxyMiddleware
// A partir de node 14.13:
// import { createProxyMiddleware } from 'http-proxy-middleware'
// https://simonplend.com/node-js-now-supports-named-imports-from-commonjs-modules-but-what-does-that-mean/

const DEFAULT_CACHE_TTL = 24 * 60 * 60 * 1000

const router = express.Router()

const refreshCache = (req, res, next, ttl) => {
    const users = getUsers()
    getUsersBadges(users)
        .then((badges) => {
            // Cache global (todos los usuarios)
            setValueToCache('/', badges, ttl)

            //Cache por usuario
            users.map((user) => {
                const userBadges = badges.filter((ub) => ub.user === user) || []
                setValueToCache(`/${user}`, userBadges[0], ttl)
            })

            res.json({ cacheKeys: getCacheKeys() })
        })
        .catch(next)
}

//CACHE: Webhook para actualizar la cache
router.post('/cache/refresh/:ttl?', (req, res, next) => {
    const ttl = req.params.ttl ? Number(req.params.ttl) : undefined
    const user = JSON.parse(req.body.payload).sender.login || 'anonymous'
    if (checkUser(user)) {
        refreshCache(req, res, next, ttl)
    } else {
        next({ status: 403, message: `Not authorized user` })
    }
})

// CACHE: Si conocemos los posibles valores, prepoblamos la cache (evitar el primer MISS)
router.get('/cache/refresh/:ttl?', (req, res, next) => {
    const ttl = req.params.ttl ? Number(req.params.ttl) : undefined
    refreshCache(req, res, next, ttl)
})

// CACHE: si esta en cache, ya podemos contestar
router.get('*', (req, res, next) => {
    const value = getValueFromCache(req.path)
    if (value) {
        res.json(value)
    } else {
        next()
    }
})

// API: Insignias de todos los usuarios
router.get('/', (req, res, next) => {
    const users = getUsers()
    getUsersBadges(users)
        .then((badges) => {
            res.locals.APIResponse = badges
            next()
        })
        .catch((error) => {
            next({
                status: 500,
                message: `Error fetching user diaries`,
            })
        })
})

// API: Insignias de un usuario
router.get('/:user*', (req, res, next) => {
    const user = req.params.user
    const check = checkUser(user)
    if (check.error) {
        next({ status: 400, message: check.text })
    } else {
        getUsersBadges([user])
            .then((userBadges) => {
                res.locals.APIResponse = userBadges[0]
                next()
            })
            .catch((err) => {
                next({
                    status: 500,
                    message: `Error fetching user ${user} diary`,
                })
            })
    }
})

// API: insignias con shields.io
router.get('/:user/humour/:humour', (req, res, next) => {
    const humour = req.params.humour
    createProxyMiddleware({
        target: 'https://img.shields.io/',
        changeOrigin: true,
        pathRewrite: (path, reqProxy) => {
            const humourEmoji = getHumourEmoji(humour)
            const humourColor = getHumourColor(humour)
            const userHumour =
                (res.locals.APIResponse &&
                    res.locals.APIResponse.humour[humour]) ||
                0
            return `/badge/${humourEmoji}-${userHumour}-${humourColor}`
        },
        onProxyRes: (proxyRes, req, res) => {
            proxyRes.headers['Cache-control'] = 'no-store' // NO CACHE!
        },
    })(req, res, next)
})

// API: Respuesta final
router.get('*', (req, res, next) => {
    if (res.locals.APIResponse) {
        // CACHE: Antes de devolver, cacheamos la respuesta
        setValueToCache(req.path, res.locals.APIResponse, DEFAULT_CACHE_TTL)
        res.json(res.locals.APIResponse)
    } else {
        next()
    }
})

// gestion de error propia, para devolver siempre JSON
router.use(function (err, req, res, next) {
    console.log(JSON.stringify(err))
    res.status(err.status || 500)
    res.json({ error: err.message })
})

// --------------------------------------
// HELPER FUNCTIONS
// --------------------------------------

// comprobacion de parámetros
const checkUser = (user) => {
    if (!user) {
        return { error: true, text: 'You must set a user' }
    } else {
        if (userExists(user)) {
            return { error: false }
        } else {
            return { error: true, text: 'Invalid user' }
        }
    }
}

const getUsersBadges = (users) => {
    const commit = 'main'
    const asyncBadges = users.map((user) => {
        return getUserDiary(user, commit).then((diarioMD) => {
            const humour = getDiaryHumour(diarioMD)
            const badges = getDiaryBadges(diarioMD)
            return { user, humour, badges }
        })
    })
    return Promise.all(asyncBadges).then((badges) => {
        const sortedBadges = badges.sort((a, b) =>
            a.user.toLowerCase() > b.user.toLocaleLowerCase() ? 1 : -1
        )
        return sortedBadges
    })
}

const getHumourEmoji = (humour) => {
    const emojisHumour = {
        grinning: '%F0%9F%98%80',
        neutral_face: '%F0%9F%98%90',
        frowning_face: '%F0%9F%98%95',
    }
    return emojisHumour[humour] || 'humour'
}

const getHumourColor = (humour) => {
    const colorHumour = {
        grinning: 'green',
        neutral_face: 'blue',
        frowning_face: 'red',
    }
    return colorHumour[humour] || 'inactive'
}

// --------------------------------------

module.exports = router
