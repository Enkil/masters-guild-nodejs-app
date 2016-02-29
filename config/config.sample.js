process.env.NODE_ENV = 'production';

const config = {
    production:{
        telegramToken: '',
        telegramWebHookURL: ''
    },
    development:{
        telegramToken: ''
    }
};

module.exports = config;