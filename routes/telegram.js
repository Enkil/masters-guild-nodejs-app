const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const ping = require('ping');
const config = require('../config/config');
const router = express.Router();

if(process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(config.production.telegramToken);
    bot.setWebHook(config.production.telegramWebHookURL + config.production.telegramToken);
}
else {
    bot = new TelegramBot(config.development.telegramToken, {polling: true});
}

console.log('TelegramBot server started...');

bot.onText(/^\/ping (.+)$/, function (msg, match) {
    const hosts = [match[1]];
    const chatId = msg.chat.id;

    hosts.forEach(function(host){
        ping.sys.probe(host, function(isAlive){
            const pingRespond = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
            bot.sendMessage(chatId, pingRespond);
        });
    });



});

/* GET telegram page. */
router.get('/', function(req, res, next) {
    res.render('telegramm', { title: 'Telegram SCP Bot webhook page', text: 'This page is not contain any usefull content' });

    res.statusCode = 200;
    res.end();
});

module.exports = router;
