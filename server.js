const express = require('express')
const bodyParser = require('body-parser')

const { dotenv, cors } = require('./src/config/config')
const routes = require('./src/routes/routes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/', routes)

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`App listening at http://0.0.0.0:${process.env.PORT}`);
})

