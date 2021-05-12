// https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
function getIndexesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length
    if (searchStrLen == 0) {
        return []
    }
    var startIndex = 0,
        index,
        indices = []
    if (!caseSensitive) {
        str = str.toLowerCase()
        searchStr = searchStr.toLowerCase()
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index)
        startIndex = index + searchStrLen
    }
    return indices
}

function getCountIndexesOf(searchStrArray, str, caseSensitive) {
    let sum = 0
    searchStrArray.map((searchStr) => {
        sum += getIndexesOf(searchStr, str, caseSensitive).length
    })
    return sum
}

// https://thekevinscott.com/emojis-in-javascript/
const grinningPattern = [': ' + '\uD83D\uDE00', ': :grinning:'] // 😀
const neutralFacePattern = [': ' + '\uD83D\uDE10', ': :neutral_face:'] // 😐
const frowningFacePattern = [': ' + '\u2639', ': :frowning_face:'] //️ ️️️️☹️

function getDiaryHumour(diarioMD) {
    const grinning = getCountIndexesOf(grinningPattern, diarioMD)
    const neutral_face = getCountIndexesOf(neutralFacePattern, diarioMD)
    const frowning_face = getCountIndexesOf(frowningFacePattern, diarioMD)
    return {
        grinning,
        neutral_face,
        frowning_face,
        total: grinning + neutral_face + frowning_face,
    }
}

function getDiaryBadges(diarioMD) {
    const humor = getDiaryHumour(diarioMD)
    const badges = []
    //FELIZ
    if (humor.grinning >= 3) {
        badges.push({
            url_image:
                'https://raw.githubusercontent.com/delineas/reto-programa-en-pantuflas/main/badges/programaenpantuflas-chanclahappy3.png',
            type: 'humor',
        })
        if (humor.grinning >= 7) {
            badges.push({
                url_image:
                    'https://raw.githubusercontent.com/delineas/reto-programa-en-pantuflas/main/badges/programaenpantuflas-chanclahappy7.png',
                type: 'humor',
            })
        }
    }
    //TRISTE
    if (humor.frowning_face >= 3) {
        badges.push({
            url_image:
                'https://raw.githubusercontent.com/delineas/reto-programa-en-pantuflas/main/badges/programaenpantuflas-botagrumpy3.png',
            type: 'humor',
        })
        if (humor.frowning_face >= 7) {
            badges.push({
                url_image:
                    'https://raw.githubusercontent.com/delineas/reto-programa-en-pantuflas/main/badges/programaenpantuflas-botagrumpy7.png',
                type: 'humor',
            })
        }
    }
    //Calcular las insignias de apuntes a partir del humor (1 humor = 1 apunte)
    if (humor.total >= 1) {
        badges.push({
            url_image:
                'https://raw.githubusercontent.com/delineas/reto-programa-en-pantuflas/main/badges/programaenpantuflas-pantufla1.png',
            type: 'diario',
        })
        if (humor.total >= 5) {
            badges.push({
                url_image:
                    'https://raw.githubusercontent.com/delineas/reto-programa-en-pantuflas/main/badges/programaenpantuflas-pantufla5.png',
                type: 'diario',
            })
            if (humor.total >= 15) {
                badges.push({
                    url_image:
                        'https://raw.githubusercontent.com/delineas/reto-programa-en-pantuflas/main/badges/programaenpantuflas-pantufla15.png',
                    type: 'diario',
                })
            }
        }
    }
    return badges
}

module.exports = {
    getDiaryHumour,
    getDiaryBadges,
}
