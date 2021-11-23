const {
  parse
} = require("dotenv");
const {
  Telegraf,
  Markup
} = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

const catalog = require("./catalog");
const constants = require("./constants");

const chat_id = -765565757;

const userData = {};
const cart = {};

const mainKeyboard = Markup.keyboard([
  Markup.button.text("Меню 📒"),
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

const contactKeyboard = Markup.keyboard([
  Markup.button.contactRequest("Оставить контакты")
]).resize().oneTime()

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
    await ctx.reply(`Выберите категорию`, menuKeyboard);
  });

  bot.hears("Меню 📒", async (ctx) => {
    await ctx.reply(`Выберите категорию`, menuKeyboard);
  });
}
showMenu();

async function showCommands() {
  bot.help(async (ctx) => {
    await ctx.reply(constants.commands)
  });
}
showCommands();

async function makePublication(category, img_src, caption, btn_data) {
  bot.hears(category, async (ctx) => {
    await ctx.replyWithPhoto({
      url: img_src,
    }, {
      parse_mode: "Markdown",
      caption: caption,
      ...Markup.inlineKeyboard([
        Markup.button.callback("Добавить в корзину 🛒", btn_data),
      ]),
    });
  });
}

async function makePublicationPizza(img_src, caption, btn_data) {
  bot.hears("Пицца 🍕", async (ctx) => {
    await ctx.replyWithPhoto({
      url: img_src,
    }, {
      parse_mode: "Markdown",
      caption: caption,
      ...Markup.inlineKeyboard([
        Markup.button.callback("Добавить в корзину 🛒", btn_data),
      ]),
    });
  });
}

async function addToCart(btn_data, price) {
  bot.action(btn_data, async (ctx) => {
    userData["id"] = ctx.chat.id;
    userData["name"] = ctx.from.first_name || ctx.from.last_name;
    cart["order"] = ctx.update.callback_query.data;
    await ctx.reply("Ведите количество");
    bot.on("message", async (ctx) => {
      if (ctx.message.text ** 1) {
        cart["count"] = ctx.message.text ** 1;
        return await ctx.reply(
          "Остался последний шаг! Ведите свои телефонные номера, чтобы мы смогли связаться с вами и уточнить заказ.",
          contactKeyboard
        );
      } else if (ctx.message.contact) {
        return await ctx.replyWithMarkdown(
          `Имя: *${userData.name}* \nТелефон: *${ctx.message.contact.phone_number}* \nЗаказ: *${cart.order}* \nЦена: *${price}* \nКоличество: *${cart.count}* \n\nЗаказ сделан ✅ \nСейчас с вами свяжутся!`,
        ),
          ctx.reply(
            "Хотите заказать что-то еще?",
            mainKeyboard
          ),
          ctx.telegram.sendMessage(chat_id,
            `Имя: *${userData.name}* \nТелефон: *${ctx.message.contact.phone_number}* \nЗаказ: *${cart.order}* \nЦена: *${price}* \nКоличество: *${cart.count}*`,
          );
      } else {
        return await ctx.reply(
          "Количество должно быть в цифровом формате и выше нуля. Повторите попытку."
        );
      }
    });
  });
}

async function addToCartPizza(btn_data, price1, price2, price3) {
  bot.action(btn_data, async (ctx) => {
    userData["id"] = ctx.chat.id;
    userData["name"] = ctx.from.first_name || ctx.from.last_name;
    cart["order"] = ctx.update.callback_query.data;
    await ctx.reply("Выберите размер", sizeKeyboard);
    bot.hears(["Средний", "Большой", "Супер семейный"], async (ctx) => {
      cart["size"] = ctx.message.text;
      await ctx.reply("Теперь введите количество");
      bot.on("message", async (ctx) => {
        if (ctx.message.text ** 1) {
          cart["count"] = ctx.message.text ** 1;
          return await ctx.reply(
            "Остался последний шаг! Ведите свои телефонные номера, чтобы мы смогли связаться с вами и уточнить заказ.",
            contactKeyboard
          );
        } else if (ctx.message.contact) {
          return await ctx.replyWithMarkdown(
            `Имя: *${userData.name}* \nТелефон: *${ctx.message.contact.phone_number}* \nЗаказ: *${cart.order
            }* \nЦена: *${cart.size === "Средний"
              ? price1
              : cart.size === "Большой"
                ? price2
                : cart.size === "Супер семейный"
                  ? price3
                  : "Не определено"
            }* \nКоличество: *${cart.count}* \nРазмер: *${cart.size
            }* \n\nЗаказ сделан ✅ \nСейчас с вами свяжутся!
            `
          ),
            ctx.reply(
              "Хотите заказать что-то еще?",
              mainKeyboard
            ),
            ctx.telegram.sendMessage(chat_id,
              `Имя: *${userData.name}* \nТелефон: *${ctx.message.contact.phone_number}* \nЗаказ: *${cart.order
              }* \nЦена: *${cart.size === "Средний"
                ? price1
                : cart.size === "Большой"
                  ? price2
                  : cart.size === "Супер семейный"
                    ? price3
                    : "Не определено"
              }* \nКоличество: *${cart.count}* \nРазмер: *${cart.size
              }*
            `
            );
        } else {
          return await ctx.reply(
            "Количество должно быть в цифровом формате и выше нуля. Повторите попытку."
          );
        }
      });
    });
  });
}

makePublicationPizza(
  catalog.catalog[0].url,
  catalog.catalog[0].description,
  catalog.catalog[0].name
);
addToCartPizza(
  catalog.catalog[0].name,
  catalog.catalog[0].price.price1,
  catalog.catalog[0].price.price2,
  catalog.catalog[0].price.price3
);

makePublication(
  catalog.catalog[1].category,
  catalog.catalog[1].url,
  catalog.catalog[1].description,
  catalog.catalog[1].name
);
addToCart(
  catalog.catalog[1].name,
  catalog.catalog[1].price
);

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));