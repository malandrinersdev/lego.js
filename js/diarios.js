const fetch = require('node-fetch')

const getUserDiary = (usuario, commit) => {
    return fetch(
        `https://raw.githubusercontent.com/${usuario}/reto-programa-en-pantuflas/${commit}/README.md`
    ).then((response) => response.text())
}

module.exports = { getUserDiary }
