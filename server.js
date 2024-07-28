const express = require('express')
const bodyParser = require('body-parser')

const { dotenv, cors } = require('./src/config/config')
const routes = require('./src/routes/routes')

const app = express()
const corsOptions = {
    origin: 'http://87.228.12.128', // Разрешить запросы с этого IP-адреса
};

app.use(express.json())
app.use(cors(corsOptions))

app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log(`app listening on ${process.env.PORT}`)
})

