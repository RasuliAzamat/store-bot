const { parse } = require("dotenv");
const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const allVariables = require("./variables");
const bot = new Telegraf(process.env.BOT_TOKEN);

const chat_id = -765565757;

const userData = {};
const orderData = {};

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

bot.hears("Пицца 🍕", async (ctx) => {
  orderData["Category"] = ctx.update.message.text;
  orderData["Price_1"] = 72;
  orderData["Price_2"] = 85;
  orderData["Price_3"] = 116;
  await ctx.replyWithPhoto(
    {
      url: "https://bellapizza.tj/wp-content/uploads/2020/12/shaurmapizza-300x300.jpg",
    },
    {
      parse_mode: "Markdown",
      caption: `*Шаурма пицца*\nБелла Соус, Моцарелла, Пепперони, Пеперончини\n\nСредняя ${userData.Price_1}сом\nБольшая ${userData.Price_2}сом\nСупер семейная ${userData.Price_3}сом`,
      ...Markup.inlineKeyboard([
        Markup.button.callback("Добавить в корзину 🛒", "Шаурма пицца"),
      ]),
    }
  );
  bot.on("callback_query", async (ctx) => {
    userData["Id"] = ctx.chat.id;
    userData["Name"] = ctx.from.first_name || ctx.from.last_name;
    orderData["Order"] = ctx.update.callback_query.data;
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
      orderData["Size"] = ctx.message.text;
      await ctx.reply("Теперь введите количество.");
      bot.on("message", async (ctx) => {
        if (ctx.message.text ** 1) {
          orderData["Count"] = ctx.message.text ** 1;
          return ctx.replyWithMarkdown(
            `
            На имя: *${userData.Name}*\nКатегория: *${
              orderData.Category
            }\n*Заказ: *${orderData.Order}*\nЦена: *${
              orderData.Size === "Средний"
                ? orderData.Price_1
                : orderData.Size === "Большой"
                ? orderData.Price_2
                : orderData.Size === "Супер семейный"
                ? orderData.Price_3
                : "Не определено"
            }*\nКоличество: *${orderData.Count}*\nРазмер: *${
              orderData.Size
            }*\n\nДобавлено в корзину ✅
            `,
            Markup.inlineKeyboard([
              [Markup.button.callback("Перейти к корзине 🛒", "cart_btn")],
            ])
          );
        } else {
          return ctx.reply(
            "Количество должно быть в цифровом формате и выше нуля. Повторите попытку."
          );
        }
      });
    });
  });
});

bot.action("cart_btn", (ctx) => {
  console.log(orderData);
  console.log(userData);
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
