# API de insignias

API para el cálculo de insignias de la comunidad Malandriner.

# Requisitos

-   Node >= 13
-   Docker + Docker Compose (sólo para despliegue)

# Entorno de desarrollo

Instalar y ejecutar con:

```
npm install

npm start
```

Al arrancar, el servidor está disponible en http://localhost:3000, e incluye funcionalidad de hot-reload mediante [nodemon](https://github.com/remy/nodemon).

Puedes comprobar el correcto funcionamiento con una petición a http://localhost:3000/insignias, que debe devolver información en formato JSON de las insignias otorgadas a los malandriners.

O bien, abrir la página de comunidad en http://localhost:3000/comunidad

Puedes comprobar los tests con:

```
npm run test
```

Para contribuir, aplicar formato al código con:

```
npm run prettier
```

(también hay integración con VSCode mediante [este plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))

# Estructura proyecto

/
├─ /data
│··├─ /diaries (datos de diarios reto en pantuflas)
│··└─ users.json (datos básicos de usuarios malandriners)
├─ /docs (documentación)
├─ /html (cliente estático)
└─ /src
···├─ /api (distintas APIs para obtener/gestionar las insignias)
···├─ /badges (módulos para calcular las insignias)
···└─ /datasources (fuentes de datos para calcular las insignias)

# Despliegue con Docker

Se puede compilar la imagen docker con:

```
docker build .
```

Y lanzar con docker-compose:

```
docker-compose up -d
```

Si se quiere acceder desde el entorno local (host), añadir el parámetro 'ports' con el valor 3000, del fichero docker-compose.yml:

```
version: "3"
services:
  web:
    build: .
    expose:
      - "3000"
    ports:
      - "3000:3000"
```
