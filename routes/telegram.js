const express = require('express');
const config = require('../config/config');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(config.telegramToken, {polling: true});
const ping = require('ping');
const router = express.Router();



/* GET telegram page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Telegram SCP Bot' });


    bot.onText(/^\/ping (.+)$/, function (msg, match) {
        const hosts = [match[1]];
        const chatId = msg.chat.id;

        hosts.forEach(function(host){
            ping.sys.probe(host, function(isAlive){
                const pingRespond = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
                bot.sendMessage(chatId, pingRespond);
            });
        });


        res.statusCode = 200;
        res.end();
    });
});

module.exports = router;
