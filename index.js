const { parse } = require("dotenv");
const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

const catalog = require("./catalog");
const constants = require("./constants");

const chat_id = -765565757;

const userData = {};
const cart = {};

const mainKeyboard = Markup.keyboard([
  Markup.button.text("Меню 📒"),
  Markup.button.text("Корзина 🛒"),
]).resize();

const menuKeyboard = Markup.keyboard([
  [Markup.button.text("Пицца 🍕")],
  [Markup.button.text("Бургеры 🍔"), Markup.button.text("Паста 🍝")],
  [Markup.button.text("Гарниры 🍟"), Markup.button.text("Салаты 🥗")],
  [Markup.button.text("Напитки 🥤"), Markup.button.text("Дессерты 🍰")],
  [Markup.button.text("На главную ⬅️")],
])
  .resize()
  .oneTime();

const sizeKeyboard = Markup.keyboard([
  [Markup.button.text("Средний"), Markup.button.text("Большой")],
  [Markup.button.text("Супер семейный")],
])
  .oneTime()
  .resize();

async function sayHello() {
  bot.start(async (ctx) => {
    await ctx.reply(
      `Здравствуйте ${ctx.from.first_name}! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
      mainKeyboard
    );
  });

  bot.hears("На главную ⬅️", async (ctx) => {
    await ctx.reply(
      `Здравствуйте ${ctx.from.first_name}! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
      mainKeyboard
    );
  });
}
sayHello();

async function showMenu() {
  bot.command("menu", async (ctx) => {
    await ctx.reply(`Выберите категорию.`, menuKeyboard);
  });

  bot.hears("Меню 📒", async (ctx) => {
    await ctx.reply(`Выберите категорию.`, menuKeyboard);
  });
}
showMenu();

async function makePublication(category, img_src, caption, btn_data) {
  bot.hears(category, async (ctx) => {
    cart["Category"] = category;
    await ctx.replyWithPhoto(
      {
        url: img_src,
      },
      {
        parse_mode: "Markdown",
        caption: caption,
        ...Markup.inlineKeyboard([
          Markup.button.callback("Добавить в корзину 🛒", btn_data),
        ]),
      }
    );
  });
}

async function makePublicationPizza(img_src, caption, btn_data) {
  bot.hears("Пицца 🍕", async (ctx) => {
    cart["Category"] = ctx.update.message.text;
    await ctx.replyWithPhoto(
      {
        url: img_src,
      },
      {
        parse_mode: "Markdown",
        caption: caption,
        ...Markup.inlineKeyboard([
          Markup.button.callback("Добавить в корзину 🛒", btn_data),
        ]),
      }
    );
  });
}

async function addToCart(btn_data, price) {
  bot.action(btn_data, async (ctx) => {
    userData["Id"] = ctx.chat.id;
    userData["Name"] = ctx.from.first_name || ctx.from.last_name;
    cart["Order"] = ctx.update.callback_query.data;
    await ctx.reply("Ведите количество.");
    bot.on("message", async (ctx) => {
      if (ctx.message.text ** 1) {
        cart["Count"] = ctx.message.text ** 1;
        return ctx.replyWithMarkdown(
          `
            На имя: *${userData.Name}* \nКатегория: *${cart.Category}* \nЗаказ: *${cart.Order}* \nЦена: *${price}* \nКоличество: *${cart.Count}* \n\nДобавлено в корзину ✅
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
}

async function addToCartPizza(btn_data, price1, price2, price3) {
  bot.action(btn_data, async (ctx) => {
    userData["Id"] = ctx.chat.id;
    userData["Name"] = ctx.from.first_name || ctx.from.last_name;
    cart["Order"] = ctx.update.callback_query.data;
    await ctx.reply("Выберите размер", sizeKeyboard);
    bot.hears(["Средний", "Большой", "Супер семейный"], async (ctx) => {
      cart["Size"] = ctx.message.text;
      await ctx.reply("Теперь введите количество.");
      bot.on("message", async (ctx) => {
        if (ctx.message.text ** 1) {
          cart["Count"] = ctx.message.text ** 1;
          return ctx.replyWithMarkdown(
            `
            На имя: *${userData.Name}* \nКатегория: *Пицца 🍕* \nЗаказ: *${
              cart.Order
            }* \nЦена: *${
              cart.Size === "Средний"
                ? price1
                : cart.Size === "Большой"
                ? price2
                : cart.Size === "Супер семейный"
                ? price3
                : "Не определено"
            }* \nКоличество: *${cart.Count}* \nРазмер: *${
              cart.Size
            }* \n\nДобавлено в корзину ✅
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
}

makePublicationPizza(
  catalog.catalog[0].url,
  `
*Шаурма пицца*
Белла Соус, Моцарелла, Пепперони, Пеперончини

Средняя ${catalog.catalog[0].price.price1}сом
Большая ${catalog.catalog[0].price.price2}сом
Супер семейная ${catalog.catalog[0].price.price3}сом
`,
  "Шаурма пицца"
);
addToCartPizza(
  "Шаурма пицца",
  catalog.catalog[0].price.price1,
  catalog.catalog[0].price.price2,
  catalog.catalog[0].price.price3
);

makePublication(
  "Бургеры 🍔",
  catalog.catalog[1].url,
  `
*Стейк Сэндвич*
Кусочки говядины, грибы, лук, болгарский перец, чесночный соус

Один размер ${catalog.catalog[1].price}сом
`,
  "Стейк Сэндвич"
);
addToCart("Стейк Сэндвич", catalog.catalog[1].price);

async function toCart() {
  bot.action("cart_btn", async (ctx) => {
    if (cart !== undefined) {
      await ctx.reply("fuck");
    } else {
      await ctx.reply("you");
    }
    console.log(cart);
  });
  bot.command("/cart", async (ctx) => {
    if (cart !== undefined) {
      await ctx.reply("fuck");
    } else {
      await ctx.reply("you");
    }
    console.log(cart);
  });
  bot.hears("Корзина 🛒", async (ctx) => {
    if (cart !== undefined) {
      await ctx.reply("fuck");
    } else {
      await ctx.reply("you");
    }
    console.log(cart);
  });
}
toCart();

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
