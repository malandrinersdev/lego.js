const fs = require('fs')
const path = require('path')

const readJSONFile = (file) => {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
}

const getUserBadges = (config) => () => {
    if (config.source === 'file') {
        return readJSONFile(config.fileName)
    } else {
        // source 'array'
        return config.userBadges || []
    }
}

const defaultConfig = {
    source: 'file', // get userBadges from: 'file' or 'array'
    // from file:
    fileName: path.join(__dirname, '..', '..', 'data', 'userBadges.json'),
    // from array:
    users: [],
}

module.exports = {
    getUserBadges: getUserBadges(defaultConfig),
    config: (config) => {
        return {
            getUserBadges: getUserBadges(config),
        }
    },
}
