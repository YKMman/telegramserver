const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const { dotenv, cors } = require('./src/config/config')
const routes = require('./src/routes/routes')



// const clientPath = path.join(__dirname, '../testing/dist');
const app = express();

// Сервирование статичных файлов из папки dist
// app.use(express.static(clientPath));
app.use(express.json());

// Настройка CORS
// const corsOptions = {
//     origin: 'https://testing-eight-nu.vercel.app', // Разрешить запросы только с этого домена
//     optionsSuccessStatus: 200 // Некоторые легаси браузеры (IE11, различные SmartTV) читают статус 204 как "no content"
// };
  
app.use(cors());



// Обработка всех остальных запросов и отправка index.html
// app.get('/', (req, res) => {
//     console.log(path.join(__dirname, '../testing/dist'), 'index.html')
//     res.sendFile(path.join(clientPath, 'index.html'));
// });
  

app.use('/', routes)



app.listen(process.env.PORT, () => {
    console.log(`app listening on ${process.env.PORT}`)
})

