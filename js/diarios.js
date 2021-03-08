import fetch from 'node-fetch'

export const obtenerDiarioUsuario = (usuario, commit) => {
    return fetch(`https://raw.githubusercontent.com/${usuario}/reto-programa-en-pantuflas/${commit}/README.md`)
        .then(response => response.text());
}