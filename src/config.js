const path = require('path')
require('dotenv').config()

const env = process.env.NODE_ENV || 'development' // 'production', 'development' or 'test'

const development = {
    datasources: {
        users: {
            source: 'file',
            fileName: path.join(__dirname, '..', 'data', 'users.json'),
        },
        userBadges: {
            source: 'file',
            fileName: path.join(__dirname, '..', 'data', 'userBadges.json'),
        },
        userDiaries: {
            source: 'file',
            dirPath: path.join(__dirname, '..', 'data', 'diaries'),
        },
    },
}

const test = {
    datasources: {
        users: {
            source: 'file',
            fileName: path.join(__dirname, '..', 'data', 'users.json'),
        },
        userBadges: {
            source: 'file',
            fileName: path.join(__dirname, '..', 'data', 'userBadges.json'),
        },
        userDiaries: {
            source: 'file',
            dirPath: path.join(__dirname, '..', 'data', 'diaries'),
        },
    },
}

const production = {
    datasources: {
        users: {
            source: 'file',
            fileName: path.join(__dirname, '..', 'data', 'users.json'),
        },
        userBadges: {
            source: 'file',
            fileName: path.join(__dirname, '..', 'data', 'userBadges.json'),
        },
        userDiaries: {
            source: 'github',
            commit: 'main',
        },
    },
}

const config = {
    development,
    test,
    production,
}

module.exports = config[env]
