const { Telegraf } = require("telegraf");
require("dotenv").config();
const { message } = require("telegraf/filters");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    `Welcome to the dev. bot \n you can start the conversation command \n /Jokes`
  );
});
bot.help((ctx) => ctx.reply("Send me a message, and I will reply."));
bot.on(message("sticker"), (ctx) => ctx.reply("❤️"));

bot.launch();

console.log("Bot is running...");
