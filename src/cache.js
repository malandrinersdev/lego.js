let cache = {}

//PUT
export const setValueToCache = (key, value, ttl) => {
    cache[key] = {
        value,
        expiresAt: ttl ? Date.now() + ttl : undefined
    }
}

//GET
export const getValueFromCache = (key) => {
    if (cache[key]) {
        if (cache[key].expiresAt) {
            const timeToExpire = cache[key].expiresAt - Date.now()
            if (timeToExpire > 0) {
                console.log(`CACHE HIT (expires in ${timeToExpire}ms): ${key}`)
                return cache[key].value
            } else {
                console.log(`CACHE MISS (expired): ${key}`)
            }
        } else {
            console.log(`CACHE HIT: ${key}`)
            return cache[key].value
        }
    } else {
        console.log(`CACHE MISS: ${key}`)
    }
}

//KEYS
export const getCacheKeys = () => {
    return Object.keys(cache)
}

//CLEAR
export const clearCache = () => {
    cache = {}
}