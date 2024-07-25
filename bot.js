const TelegramBot = require('node-telegram-bot-api');

const { dotenv } = require('./src/config/config')

const webAppUrl = 'https://ykmman.github.io/testing/';
// const webAppUrl = 'https://t.me/miniAPP_YKM_bot/app'
// const webAppUrl = 'https://172.16.250.170:5173/testing'

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




