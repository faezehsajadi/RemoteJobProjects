const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    try {
        // داده‌ها رو از درخواست فرانت‌اند بگیر (مثلاً لیست تودو)
        const { tasks } = JSON.parse(event.body);

        // تنظیمات بات تلگرام (از متغیرهای محیطی Netlify)
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        // ساخت متن برای ارسال به تلگرام (لیست تودو به‌صورت متنی)
        let message = 'لیست کارهای من:\n\n';
        tasks.forEach((task, index) => {
            message += `${index + 1}. ${task.text} - ${task.time}\n`;
        });

        // ارسال به تلگرام با API تلگرام
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Telegram API error: ${result.description}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'List sent to Telegram successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};