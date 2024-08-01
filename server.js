// const express = require('express')
// const path = require('path')
// const bodyParser = require('body-parser')

// const { dotenv, cors } = require('./src/config/config')
// const routes = require('./src/routes/routes')


// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use('/', routes)
// app.listen(process.env.PORT, () => {
//     console.log(`app listening on ${process.env.PORT}`)
// })


const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { dotenv, cors } = require('./src/config/config');
const routes = require('./src/routes/routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', routes);

const options = {
    key:fs.readFileSync(path.join(__dirname,'./cert/key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'./cert/cert.pem'))
};

https.createServer(options, app).listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


