# Twilio SMS Integratsiyasi

Bu Telegram bot Twilio yordamida SMS yuborish funksiyasini amalga oshiradi. Foydalanuvchi bot orqali yuboriladigan xabarni kiritadi va bot Twilio xizmatidan foydalanib belgilangan raqamga SMS yuboradi.

## Talablar

Loyihani muvaffaqiyatli ishga tushirish uchun quyidagilar talab qilinadi:

- **Node.js** (v16 yoki undan yuqori)
- **Twilio hisob qaydnomasi** (Trial yoki to‘liq)
- **Telegram Bot API tokeni** (BotFather orqali olinadi)

## Twilio Integratsiyasi

Twilio yordamida bot orqali SMS yuborish funksiyasi quyidagicha ishlaydi:

1. **Foydalanuvchi xabarni kiritadi**: Bot foydalanuvchidan SMS orqali yuboriladigan xabarni kiritishni so'raydi.
2. **Twilio API orqali SMS yuboriladi**: Bot statik telefon raqamiga (yoki `.env` faylida belgilangan raqamga) SMS yuboradi.
3. **Bot javob qaytaradi**: Xabar muvaffaqiyatli yuborilgach, foydalanuvchiga SMS yuborilgani haqida javob qaytariladi.

### .env fayli

Loyihani muvaffaqiyatli ishlatish uchun `.env` faylini quyidagi ma'lumotlar bilan to'ldiring:

```bash
TELEGRAM_BOT_TOKEN=your_telegram_bot_token      # Telegram botingiz uchun token
TWILIO_ACCOUNT_SID=your_twilio_account_sid      # Twilio Account SID (Twilio console'dan olingan)
TWILIO_AUTH_TOKEN=your_twilio_auth_token        # Twilio Auth Token (Twilio console'dan olingan)
TWILIO_PHONE_NUMBER=your_twilio_phone_number    # Twilio'dan olgan telefon raqamingiz
TWILIO_STATIC_PHONE_NUMBER=+998932052443        # SMS yuboriladigan statik telefon raqam
```

- **TELEGRAM_BOT_TOKEN**: Telegram BotFather orqali olingan bot tokeni.
- **TWILIO_ACCOUNT_SID**: Twilio hisobingizga tegishli **Account SID** (bu ma'lumotni [Twilio Console](https://www.twilio.com/console) orqali olish mumkin).
- **TWILIO_AUTH_TOKEN**: Twilio hisobingiz uchun **Authentication Token** (Account SID bilan birga olinadi).
- **TWILIO_PHONE_NUMBER**: Twilio'dan olingan telefon raqami, bu raqamdan SMS yuboriladi.
- **TWILIO_STATIC_PHONE_NUMBER**: Statik telefon raqami, bu raqamga foydalanuvchi yuboriladigan SMS jo'natiladi.

### Twilio SMS Yuborish Jarayoni

1. **Foydalanuvchi botni ishga tushiradi**: Foydalanuvchi botga `/start` komandasi bilan kiradi va asosiy menyuda "📩 SMS yuborish" tugmasini ko'radi.
2. **Bot foydalanuvchidan xabarni so'raydi**: "📩 SMS yuborish" tugmasi bosilganda, bot foydalanuvchidan yuboriladigan xabarni kiritishni so'raydi.
3. **Twilio orqali SMS yuboriladi**: Foydalanuvchi xabarni kiritgach, bot bu xabarni Twilio orqali `.env` faylida belgilangan raqamga yuboradi.
4. **Bot javob qaytaradi**: SMS muvaffaqiyatli yuborilgach, foydalanuvchiga xabar yuborilgani haqida bildiriladi.

### Twilio API dan foydalanish

Loyihada Twilio SMS xizmatidan foydalanish uchun [Twilio Node.js SDK](https://www.twilio.com/docs/libraries/node) ishlatilgan. **Twilio SDK** yordamida SMS yuborish funksiyasi quyidagi tarzda amalga oshiriladi:

```javascript
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.messages.create({
    body: 'Yuboriladigan xabar',
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.TWILIO_STATIC_PHONE_NUMBER
})
.then(message => console.log(message.sid))
.catch(error => console.error(error));
```

Bu kod bo'lagi **Twilio API** orqali SMS yuborish jarayonini ko'rsatadi:
- **`client.messages.create()`**: Bu funksiya yordamida SMS yuboriladi.
- **`body`**: SMS orqali yuboriladigan xabar matni.
- **`from`**: Twilio'dan olgan telefon raqamingiz.
- **`to`**: SMS yuboriladigan raqam (statik raqam).

### O'rnatish va Ishga Tushirish

Loyihani o'rnatish va ishga tushirish uchun quyidagi qadamlarni bajaring:

1. **Loyihani klonlash**:

   ```bash
   git clone https://github.com/azadov-azamat/twilio-with-bot.git
   cd twilio-with-bot
   ```

2. **Talab qilinadigan paketlarni o'rnatish**:

   ```bash
   npm install
   ```

3. **.env faylini sozlash**:

   `.env` fayliga yuqoridagi kerakli ma'lumotlarni kiriting.

4. **Botni ishga tushirish**:

   ```bash
   node index.js
   ```

### Twilio SMS xizmatlarining cheklovlari (Trial hisob uchun)

Agar siz Twilio **trial** (sinov) hisobidan foydalanayotgan bo'lsangiz:
- Siz faqat tasdiqlangan telefon raqamlariga SMS yuborishingiz mumkin.
- Twilio hisobingizni tasdiqlash va to‘liq xizmatlardan foydalanish uchun Twilio konsolida raqamlar qo‘shishingiz kerak.

Twilio sinov hisobi faqat cheklangan xizmatlar bilan ishlaydi, lekin to‘liq hisobni faollashtirish orqali barcha raqamlarga SMS yuborishingiz mumkin bo‘ladi.

### Foydali Hujjatlar

- [Twilio Node.js SDK](https://www.twilio.com/docs/libraries/node)
- [Twilio SMS API](https://www.twilio.com/docs/sms)
- [Telegram Bot API](https://core.telegram.org/bots/api)
