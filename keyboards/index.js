const { Markup } = require('telegraf');

const mainMenu = Markup.keyboard([
    ['📩 SMS yuborish', 'ℹ️ Yordam'],
]).resize();

module.exports = {mainMenu};
