const fs = require('fs')
const path = require('path')
const { getDiaryBadges, getDiaryHumour } = require('./diaryBadges')

const getSampleDiary = (diarySample) => {
    return fs.readFileSync(
        path.join(
            __dirname,
            '..',
            '..',
            'data',
            'diaries',
            `${diarySample}-sample.md`
        ),
        'utf8'
    )
}

test('get badges from basic diary', () => {
    const diary = getSampleDiary('basic')
    const badges = getDiaryBadges(diary)

    expect(badges.length).toBe(1)
    expect(badges[0]).toHaveProperty('type')
    expect(badges[0]).toHaveProperty('name')
    expect(badges[0]).toHaveProperty('url')
})

test('get humour from basic diary', () => {
    const diary = getSampleDiary('basic')
    const humour = getDiaryHumour(diary)

    expect(humour.grinning).toBe(1)
    expect(humour.neutral_face).toBe(1)
    expect(humour.frowning_face).toBe(1)
    expect(humour.total).toBe(3)
})
