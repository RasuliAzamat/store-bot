const { parse } = require("dotenv");
const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const allVariables = require("./variables");
const bot = new Telegraf(process.env.BOT_TOKEN);

const chat_id = -765565757;

const user = {};

bot.start(async (ctx) => {
  await ctx.reply(
    `Здравствуйте ${ctx.from.first_name}! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
    Markup.keyboard([
      Markup.button.text("Меню 📒"),
      Markup.button.text("Корзина 🛒"),
    ]).resize()
  );
});

bot.hears("На главную ⬅️", async (ctx) => {
  await ctx.reply(
    `Здравствуйте ${ctx.from.first_name}! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
    Markup.keyboard([
      Markup.button.text("Меню 📒"),
      Markup.button.text("Корзина 🛒"),
    ]).resize()
  );
});

bot.command("menu", async (ctx) => {
  await ctx.reply(
    `Выберите категорию.`,
    Markup.keyboard([
      [Markup.button.text("Пицца 🍕")],
      [Markup.button.text("Бургеры 🍔"), Markup.button.text("Паста 🍝")],
      [Markup.button.text("Гарниры 🍟"), Markup.button.text("Салаты 🥗")],
      [Markup.button.text("Напитки 🥤"), Markup.button.text("Дессерты 🍰")],
      [Markup.button.text("На главную ⬅️")],
    ])
      .resize()
      .oneTime()
  );
});
bot.hears("Меню 📒", async (ctx) => {
  await ctx.reply(
    `Выберите категорию.`,
    Markup.keyboard([
      [Markup.button.text("Пицца 🍕")],
      [Markup.button.text("Бургеры 🍔"), Markup.button.text("Паста 🍝")],
      [Markup.button.text("Гарниры 🍟"), Markup.button.text("Салаты 🥗")],
      [Markup.button.text("Напитки 🥤"), Markup.button.text("Дессерты 🍰")],
      [Markup.button.text("На главную ⬅️")],
    ])
      .resize()
      .oneTime()
  );
});

function makePublication(
  ctx,
  img_url,
  parse_publication,
  parse_text,
  caption_txt,
  btn_txt,
  btn_data
) {
  ctx.replyWithPhoto(
    {
      url: img_url,
    },
    {
      parse_mode: parse_publication,
      parse_mode: parse_text,
      caption: caption_txt,
      ...Markup.inlineKeyboard([Markup.button.callback(btn_txt, btn_data)]),
    }
  );
}

bot.hears("Пицца 🍕", async (ctx) => {
  makePublication(
    ctx,
    "https://bellapizza.tj/wp-content/uploads/2020/12/shaurmapizza-300x300.jpg",
    "Markdown",
    "HTML",
    `<b>Шаурма пицца</b>\nБелла Соус, Моцарелла, Пепперони, Пеперончини\n\nСредняя 72сом\nБольшая 85сом\nСупер семейная 116сом`,
    "Добавить в корзину 🛒",
    "Шаурма пицца"
  );
});
bot.on("callback_query", async (ctx) => {
  user["Id"] = ctx.chat.id;
  user["Name"] = ctx.from.first_name || ctx.from.last_name;
  user["Order"] = ctx.update.callback_query.data;
  await ctx.reply(
    "Выберите размер",
    Markup.keyboard([
      [Markup.button.text("Средний"), Markup.button.text("Большой")],
      [Markup.button.text("Супер семейный")],
    ])
      .oneTime()
      .resize()
  );
  bot.hears(["Средний", "Большой", "Супер семейный"], async (ctx) => {
    user["Size"] = ctx.message.text;
    await ctx.reply("Теперь введите количество.");
    bot.on("message", async (ctx) => {
      if (ctx.message.text ** 1) {
        user["Count"] = ctx.message.text;
        return ctx.replyWithMarkdown(
          `
        На имя: *${user.Name}*\nЗаказ: *${user.Order}*\nКоличество: *${user.Count}*\nРазмер: *${user.Size}*\n\nДобавлено в корзину ✅
        `,
          Markup.inlineKeyboard([
            [Markup.button.callback("Перейти к корзине 🛒", "Кнопка корзины")],
          ])
        );
      } else {
        return ctx.reply(
          "Количество должно быть в цифровом формате. Повторите попытку."
        );
      }
    });
  });
});
// bot.action(/.+/, (ctx) => {
//   return (
//     ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`),
//     ctx.answerInlineQuery(`Oh, ${ctx.match[0]}! Great choice`)
//   );
// });

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
