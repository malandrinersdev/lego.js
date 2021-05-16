const fetch = require('node-fetch')

const getUserDiary = (user, commit) => {
    return fetch(
        `https://raw.githubusercontent.com/${user}/reto-programa-en-pantuflas/${commit}/README.md`
    ).then((response) => response.text())
}

module.exports = { getUserDiary }
