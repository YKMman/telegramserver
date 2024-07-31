const TelegramBot = require('node-telegram-bot-api');

const { dotenv } = require('./src/config/config')

const webAppUrl = 'https://testing-eight-nu.vercel.app/';
// const webAppUrl = 'https://t.me/miniAPP_YKM_bot/app'
// const webAppUrl = 'https://127.0.0.1:3000'


const bot = new TelegramBot(process.env.API_KEY_BOT, {
    polling: true
});



bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Заходи в наше приложение', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Открыть приложение', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }
});


// ПРОВЕРКА НА ПОДПИСКУ ТЕЛЕГРАММ ГРУПП (ФУНКЦИЯ ДЛЯ ПЕРЕИСПОЛЬЗУЕМОСТИ)

