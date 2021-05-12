const fs = require('fs')
const path = require('path')
const {
    calcularInsigniasDiario,
    obtenerHumorDiario,
} = require('./insignias.js')

const getDiarySample = (diarySample) => {
    return fs.readFileSync(
        path.join(
            __dirname,
            '..',
            'data',
            'diaries',
            `${diarySample}-sample.md`
        ),
        'utf8'
    )
}

test('get badges from basic diary', () => {
    const diary = getDiarySample('basic')
    const badges = calcularInsigniasDiario(diary)

    expect(badges.length).toBe(1)
})

test('get humour from basic diary', () => {
    const diary = getDiarySample('basic')
    const humour = obtenerHumorDiario(diary)

    expect(humour.grinning).toBe(1)
    expect(humour.neutral_face).toBe(1)
    expect(humour.frowning_face).toBe(1)
    expect(humour.total).toBe(3)
})
