const { Telegraf } = require("telegraf");
require("dotenv").config();
const { message } = require("telegraf/filters");

const { jokesApi } = require("./api/jokes");
const { jobsApi } = require("./api/jobs");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "🎊🎊 <b>Welcome to the Dev Bot</b> 🎊🎊\n\n" +
      "You can start with these commands:\n\n" +
      "/Jokes - Get a random joke 😂\n" +
      "/Sample_Song - Play a sample song 🎵\n" +
      "/Jobs - Find job opportunities 💼",
    { parse_mode: "HTML" }
  );
});
bot.help((ctx) => ctx.reply("Send me a message, and I will reply."));
bot.on(message("sticker"), (ctx) => ctx.reply("❤️"));

// Jokes API
bot.command("Jokes", async (ctx) => {
  const { data } = await jokesApi();
  if (data) {
    ctx.reply(
      `🤣 *Here's a funny engineering joke for you!* 🤖\n\n👉 *${data}* 😆\n\n💡 Hope this made your day better! 🚀`
    );
  } else {
    ctx.reply("There is a problem please try again later");
  }
});

// Jobs API
bot.command("Jobs", async (ctx) => {
  const jobs = await jobsApi();
  if (jobs && jobs.length > 0) {
    jobs.forEach((job) => {
      const {
        title,
        organization,
        organization_url,
        date_validthrough,
        date_posted,
        employment_type,
        organization_logo,
        locations_derived,
        linkedin_org_url,
        linkedin_org_size,
        seniority,
        url,
      } = job;

      const logo = organization_logo || "https://via.placeholder.com/200";

      const postedDate = new Date(date_posted).toDateString();
      const validThrough = new Date(date_validthrough).toDateString();

      ctx.replyWithPhoto(logo, {
        caption:
          `<b>🚀 ${title}</b>\n\n` +
          `🏢 <b>Company:</b> <a href='${organization_url}'>${organization}</a>\n` +
          `📍 <b>Location:</b> ${
            locations_derived ? locations_derived.join(", ") : "Not specified"
          }\n` +
          `💼 <b>Type:</b> ${
            employment_type ? employment_type.join(", ") : "Not specified"
          }\n` +
          `📅 <b>Posted:</b> ${postedDate}\n` +
          `⏳ <b>Valid Until:</b> ${validThrough}\n\n` +
          `🌐 <b>Company Website:</b> <a href='${linkedin_org_url}'>${organization}</a>\n` +
          `👥 <b>Company Size:</b> ${linkedin_org_size || "Not specified"}\n` +
          `🎖️ <b>Seniority Level:</b> ${seniority || "Not specified"}\n\n` +
          `🔗 <b>Apply Here:</b> <a href='${url}'>View Job</a>`,
        parse_mode: "HTML",
      });
    });
  } else {
    ctx.reply("❌ No job listings available at the moment.");
  }
});

// Sample Songs
bot.command("Sample_Song", (ctx) => {
  const sampleSongs = [
    "Tu Laut Aa, Yeh Jahaan Tera...mp3",
    "Dev's heart will touch the sky.mp3",
    "Hawa Mein Kho Gaya 🌙✨.mp3",
  ];

  const randomSong =
    sampleSongs[Math.floor(Math.random() * sampleSongs.length)];

  ctx.replyWithAudio({
    source: `./assets/audio/${randomSong}`,
  });
});

bot.launch();

console.log("Bot is running...");
