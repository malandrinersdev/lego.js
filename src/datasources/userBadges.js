const fs = require('fs')
const path = require('path')

const readJSONFile = (file) => {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
}

const getUsersBadges = (config) => () => {
    if (config.source === 'file') {
        return readJSONFile(config.fileName)
    } else {
        // source 'array'
        return config.usersBadges || []
    }
}

const getUserBadges = (getUsersBadges) => (user) => {
    return getUsersBadges().find((userBadge) => userBadge.user === user)
}

const defaultConfig = {
    source: 'file', // get userBadges from: 'file' or 'array'
    // from file:
    fileName: path.join(__dirname, '..', '..', 'data', 'userBadges.json'),
    // from array:
    usersBadges: [],
}

const defaultGetUsersBadges = getUsersBadges(defaultConfig)

module.exports = {
    getUsersBadges: defaultGetUsersBadges,
    getUserBadges: getUserBadges(defaultGetUsersBadges),
    config: (config) => {
        const configGetUsersBadges = getUsersBadges(config)
        return {
            getUsersBadges: configGetUsersBadges,
            getUserBadges: getUserBadges(configGetUsersBadges),
        }
    },
}
