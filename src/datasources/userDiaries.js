const fetch = require('node-fetch')
const path = require('path')
const fsp = require('fs').promises

const getUserDiary = (config) => (user) => {
    if (config.type === 'github') {
        return fetch(
            `https://raw.githubusercontent.com/${user}/reto-programa-en-pantuflas/${config.commit}/README.md`
        ).then((response) => response.text())
    } else {
        // from file
        const diaryFile = path.join(config.dirPath, `${user}.md`)
        return fsp.readFile(diaryFile, 'utf8')
    }
}

const defaultConfig = {
    source: 'file', // get userBadges from: 'file' or 'github'
    // from file:
    dirPath: path.join(__dirname, '..', '..', 'data', 'diaries'),
    // from array:
    commit: 'main',
}

module.exports = {
    getUserDiary: getUserDiary(defaultConfig),
    config: (customConfig) => {
        return {
            getUserDiary: getUserDiary(customConfig),
        }
    },
}
