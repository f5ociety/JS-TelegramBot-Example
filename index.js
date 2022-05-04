require("dotenv").config();
const API_KEY = process.env.API_KEY;
const OUR_GROUP_ID = process.env.OUR_GROUP_ID;
const OUR_GROUP_URL = process.env.OUR_GROUP_URL;
const { Telegraf, Markup } = require("telegraf");
const fs = require("fs");
const bot = new Telegraf(API_KEY);

const qivan = "Иван мышь?";
const qserg = "Сергей мышь?";
const aivan = true;
const aserg = false;

const fix_html = (text) => {
  return text.replace("<", "%lt;").replace(">", "%gt;");
};

const viktory_send = (ctx, q, a, yes) => {
  ctx.replyWithHTML(
    `${ctx.from.first_name != undefined ? ctx.from.first_name + " " : ""}${
      ctx.from.last_name != undefined ? ctx.from.last_name + " " : ""
    }(@${ctx.from.username}), ответ <code>${
      a ? "Да" : "Нет"
    }</code> на вопрос <code>${q}</code> - ${yes ? "Верный" : "НЕВЕРНЫЙ"}!`
  );
};

const viktory_keyboard = (yes, no) => {
  return Markup.inlineKeyboard([
    Markup.button.callback("Да", yes),
    Markup.button.callback("Нет", no),
  ]);
};

bot
  .command("start", (ctx) => {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Привет!\nЧтобы увидеть список команд, напиши /help",
      {}
    );
  })
  .command("help", async (ctx) => {
    let data = await fs.readFileSync("help.txt", "utf8");
    await ctx.replyWithHTML(data);
  })
  .hears(/\/echo (.+)/, async (ctx) => {
    await ctx.reply(ctx.match[1]);
  })
  .command("ping", async (ctx) => {
    await ctx.reply("Понг!");
  })
  .hears(/\/report (.+)/, async (ctx) => {
    await bot.telegram.sendMessage(
      OUR_GROUP_ID,
      `${ctx.from.first_name != undefined ? ctx.from.first_name : ""} ${
        ctx.from.last_name != undefined ? ctx.from.last_name : ""
      } (@${ctx.from.username}) написал${
        ctx.chat.title != undefined
          ? ` в чате ${ctx.chat.title}${
              ctx.chat.username != undefined ? ` (@${ctx.chat.username})` : ""
            }`
          : ""
      }: "${ctx.match[1]}"`
    );
    await ctx.reply("Сообщение отправлено разработчикам!");
  })
  .command("get_id", async (ctx) => {
    if (ctx.message.reply_to_message != undefined) {
      await ctx.replyWithHTML(
        `ID ${ctx.message.reply_to_message.from.first_name}: <code>${ctx.message.reply_to_message.from.id}</code>`
      );
    } else {
      await ctx.replyWithHTML(`Твой ID: <code>${ctx.from.id}</code>`);
    }
  })
  .command("json", async (ctx) => {
    await ctx.replyWithHTML(`<code>${JSON.stringify(ctx.message)}</code>`);
  });

bot
  .command("ivan", async (ctx) => {
    await ctx.reply(qivan, viktory_keyboard("ivanmouse", "ivannotmouse"));
  })
  .action("ivanmouse", (ctx) => {
    viktory_send(ctx, qivan, true, aivan);
  })
  .action("ivannotmouse", (ctx) => {
    viktory_send(ctx, qivan, false, !aivan);
  });

bot
  .command("sergej", (ctx) => {
    ctx.reply(qserg, viktory_keyboard("sergejmouse", "sergejnotmouse"));
  })
  .action("sergejmouse", (ctx) => {
    viktory_send(ctx, qserg, true, aserg);
  })
  .action("sergejnotmouse", (ctx) => {
    viktory_send(ctx, qserg, false, !aserg);
  });

bot.command("del100", async (ctx) => {
  try {
    let k = 0;
    for (let i = 0; i <= 100; i++) {
      k = ctx.message.message_id - i;
      await ctx.deleteMessage(k);
    }
  } catch {
  }
}).command("del10", async (ctx) => {
  try {
    let k = 0;
    for (let i = 0; i <= 10; i++) {
      k = ctx.message.message_id - i;
      await ctx.deleteMessage(k);
    }
  } catch {
  }
});

bot.launch();
