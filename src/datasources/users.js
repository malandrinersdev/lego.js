const fs = require('fs')
const path = require('path')

const getUsersFromFile = (file) => {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
}

const getUsers = (config) => () => {
    if (config.source === 'file') {
        return getUsersFromFile(config.fileName)
    } else {
        // source 'array'
        return config.users || []
    }
}

const defaultConfig = {
    source: 'file', // get users from: 'file' or 'array'
    // from file:
    fileName: path.join(__dirname, '..', '..', 'data', 'users.json'),
    // from array:
    users: [],
}

module.exports = {
    getUsers: getUsers(defaultConfig),
    config: (config = defaultConfig) => {
        return {
            getUsers: getUsers(config),
        }
    },
}
