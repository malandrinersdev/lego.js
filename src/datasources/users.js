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

const userExists = (getUsers) => (user) => {
    const foundUser = getUsers().find((u) => u === user)
    return foundUser !== undefined
}

const defaultConfig = {
    source: 'file', // get users from: 'file' or 'array'
    // from file:
    fileName: path.join(__dirname, '..', '..', 'data', 'users.json'),
    // from array:
    users: [],
}

const defaultGetUsers = getUsers(defaultConfig)

module.exports = {
    getUsers: defaultGetUsers,
    userExists: userExists(defaultGetUsers),
    config: (config = defaultConfig) => {
        const configGetUsers = getUsers(config)
        return {
            getUsers: configGetUsers,
            userExists: userExists(configGetUsers),
        }
    },
}
