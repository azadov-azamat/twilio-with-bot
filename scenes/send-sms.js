const { Markup, Scenes } = require('telegraf');
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const staticPhoneNumber = process.env.TWILIO_STATIC_PHONE_NUMBER;

const { mainMenu } = require('../keyboards');

const smsWizard = new Scenes.WizardScene(
    'sms_wizard',
    async (ctx) => {
        await ctx.reply('Yuboriladigan xabarni kiriting:', Markup.removeKeyboard());
        return ctx.wizard.next();
    },
    async (ctx) => {
        const message = ctx.message.text;

        client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: staticPhoneNumber
        })
            .then((res) => {
                ctx.reply(`Xabaringiz ${staticPhoneNumber} raqamiga muvaffaqiyatli yuborildi!`, mainMenu);
            })
            .catch((err) => {
                console.error(err);
                ctx.reply('Xabar yuborishda xatolik yuz berdi.', mainMenu);
            });

        return ctx.scene.leave();
    }
);

module.exports = smsWizard;
