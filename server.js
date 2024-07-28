const express = require('express')
const bodyParser = require('body-parser')

const { dotenv, cors } = require('./src/config/config')
const routes = require('./src/routes/routes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log(`app listening on ${process.env.PORT}`)
})

