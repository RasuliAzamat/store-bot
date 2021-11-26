const { parse } = require("dotenv");
const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

const { catalog } = require("./catalog");
const { constants } = require("./constants");

const chat_id = -765565757;

const userData = {};
const cart = {};

const mainKeyboard = Markup.keyboard([Markup.button.text("Меню 📒")]).resize();

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
  [Markup.button.text("На главную ⬅️")],
])
  .oneTime()
  .resize();

const contactKeyboard = Markup.keyboard([
  [Markup.button.contactRequest("Оставить контакты")],
  [Markup.button.text("На главную ⬅️")],
])
  .resize()
  .oneTime();

async function sayHello() {
  bot.start(async (ctx) => {
    await ctx.reply(
      `Здравствуйте ${ctx.from.first_name || ctx.from.last_name || ctx.from.username
      }! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
      mainKeyboard
    );
  });

  bot.hears("На главную ⬅️", async (ctx) => {
    await ctx.reply(
      `Здравствуйте ${ctx.from.first_name || ctx.from.last_name || ctx.from.username
      }! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
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
    await ctx.reply(constants.commands);
  });
}
showCommands();

async function makePublication(category_food, img_src, caption_txt, btn_data) {
  bot.hears(category_food, async (ctx) => {
    await ctx.replyWithPhoto(
      { url: img_src },
      {
        parse_mode: "Markdown",
        caption: caption_txt,
        ...Markup.inlineKeyboard([Markup.button.callback("Добавить в корзину 🛒", btn_data)]),
      }
    );
  });
}

async function addToCartWithSize(price1, price2, price3) {

  bot.action("Шаурма пицца", async (ctx) => {

    userData["id"] = ctx.chat.id;
    userData["name"] = ctx.from.first_name || ctx.from.last_name || ctx.from.username;
    cart["order"] = ctx.update.callback_query.data;

    await ctx.reply("Выберите размер", sizeKeyboard);

    bot.hears(["Средний", "Большой", "Супер семейный"], async (ctx) => {

      cart["size"] = ctx.message.text;

      await ctx.reply("Теперь введите количество");

      bot.on("message", async (ctx) => {

        if (ctx.message.text ** 1) {

          cart["count"] = ctx.message.text;

          return await ctx.reply(
            "Остался последний шаг. Ведите свои телефонные номера, чтобы мы смогли связаться с вами и уточнить заказ.",
            contactKeyboard
          );

        } else if (ctx.message.contact) {

          userData["phone"] = ctx.message.contact.phone_number

          return (

            await ctx.replyWithMarkdown(
              `Имя: *${userData.name}* \nТелефон: *+${userData.phone}* \nЗаказ: *${cart.order}* \nЦена: *${cart.size === "Средний"
                ? price1
                : cart.size === "Большой"
                  ? price2
                  : cart.size === "Супер семейный"
                    ? price3
                    : "Не определено"
              }* \nКоличество: *${cart.count
              }* \nРазмер: *${cart.size}* \n\nЗаказ сделан ✅ \nСейчас с вами свяжутся!
            `
            ),

            delete userData.id, delete userData.name, delete userData.phone, delete cart.order, delete cart.size, delete cart.count,
            await ctx.reply("Хотите заказать что-то еще?", menuKeyboard)
            
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

async function addToCartWithoutSize(price) {

  bot.action("Стейк Сэндвич", async (ctx) => {

    userData["id"] = ctx.chat.id;
    userData["name"] = ctx.from.first_name || ctx.from.last_name || ctx.from.username;
    cart["order"] = ctx.update.callback_query.data;

    await ctx.reply("Введите количество");

    bot.on("message", async (ctx) => {

      if (ctx.message.text ** 1) {

        cart["count"] = ctx.message.text;

        return await ctx.reply(
          "Остался последний шаг. Ведите свои телефонные номера, чтобы мы смогли связаться с вами и уточнить заказ.",
          contactKeyboard
        );
      } else if (ctx.message.contact) {

        userData["phone"] = ctx.message.contact.phone_number

        return (

          await ctx.replyWithMarkdown(
            `Имя: *${userData.name}* \nТелефон: *+${userData.phone}* \nЗаказ: *${cart.order}* \nЦена: *${price}* \nКоличество: *${cart.count}* \n\nЗаказ сделан ✅ \nСейчас с вами свяжутся!
            `
          ),

          delete userData.id, delete userData.name, delete userData.phone, delete cart.order, delete cart.count,
          await ctx.reply("Хотите заказать что-то еще?", menuKeyboard)

        );

      } else {
        return await ctx.reply(
          "Количество должно быть в цифровом формате и выше нуля. Повторите попытку."
        );
      }
    });
  });
}

makePublication(catalog[0].category, catalog[0].url, catalog[0].description, catalog[0].name);
addToCartWithSize(catalog[0].price.price1, catalog[0].price.price2, catalog[0].price.price3);

makePublication(catalog[1].category, catalog[1].url, catalog[1].description, catalog[1].name);
addToCartWithoutSize(catalog[1].price);

makePublication(catalog[2].category, catalog[2].url, catalog[2].description, catalog[2].name);
addToCartWithoutSize(catalog[2].price);

makePublication(catalog[3].category, catalog[3].url, catalog[3].description, catalog[3].name);
addToCartWithoutSize(catalog[3].price);

makePublication(catalog[4].category, catalog[4].url, catalog[4].description, catalog[4].name);
addToCartWithoutSize(catalog[4].price);

makePublication(catalog[5].category, catalog[5].url, catalog[5].description, catalog[5].name);
addToCartWithoutSize(catalog[5].price);

makePublication(catalog[6].category, catalog[6].url, catalog[6].description, catalog[6].name);
addToCartWithoutSize(catalog[6].price);


bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
