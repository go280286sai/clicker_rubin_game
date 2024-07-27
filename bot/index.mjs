import { Telegraf, Markup } from 'telegraf';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const LOCAL_WEB_APP_URL = process.env.LOCAL_WEB_APP_URL;

const bot = new Telegraf(TOKEN);

bot.start((ctx) => {
    const referral = ctx.payload.length>1?ctx.payload:null;
    const id = ctx.from.id.toString();
    const get_names = ctx.from.first_name;
    const names = get_names.length>1?get_names:"";
    ctx.reply(
        `Привет, ${ctx.message.from.first_name}! Нажми на кнопку ниже, чтобы начать игру.`,
        Markup.inlineKeyboard([
            [Markup.button.webApp('Играть', LOCAL_WEB_APP_URL+`/${id}/${get_names}/${referral}`)],
        ])
    );
});

bot.on('message', async (ctx) => {
    try {
        await ctx.telegram.copyMessage(ctx.chat.id, ctx.chat.id, ctx.message.message_id);
    } catch (error) {
        ctx.reply('Nice try!');
    }
});

bot.launch().then(() => {
    console.log('Bot started');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
