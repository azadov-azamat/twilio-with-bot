require('dotenv').config()
const { Telegraf, Scenes, session } = require('telegraf');
const express = require('express');

const smsWizard = require('./scenes/send-sms');
const { mainMenu} = require('./keyboards');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const stage = new Scenes.Stage([smsWizard]);

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => {
    ctx.reply('Xush kelibsiz! Quyidagi tugmalar orqali xizmatlardan foydalaning:', mainMenu);
});


bot.hears('📩 SMS yuborish', async (ctx) => {
    await ctx.scene.enter('sms_wizard');
});

bot.hears('ℹ️ Yordam', async (ctx) => {
    await ctx.reply('Twilio orqali SMS yuborish uchun "📩 SMS yuborish" tugmasini bosing.');
});

bot.hears('🔙 Asosiy menyuga qaytish', (ctx) => {
    ctx.reply('Asosiy menyuga qaytishingiz mumkin:', mainMenu);
});

bot.hears('☎️ Qo‘ng‘iroq qilish', (ctx) => {
    ctx.reply('Bu funksiya hali amalga oshirilmagan.', mainMenu);
});

const app = express();
const port = process.env.PORT || 8080; // Default port for Render.com services

// Endpoint to respond to HTTP requests (for UptimeRobot)
app.get('/', (req, res) => {
    res.send('Bot is running...');
});

app.listen(port, function () {
    bot.launch();
    console.log('Express server listening on port ' + port);
});

app.on('error', onError);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const shutdown = async (val) => {
    console.log('Shutting down gracefully...');

    try {
        await bot.stop(val);
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

console.log('Bot is running...');

