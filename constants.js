const { Markup } = require("telegraf");

const commands = `
/start Начать с начала
/menu Просмотреть меню
/help Просмотреть все комманды
`;

const chat_id = -765565757;

const mainKeyboard = Markup.keyboard([Markup.button.text("Меню 📒")]).resize();

const cartKeyboard = Markup.inlineKeyboard([Markup.button.callback("Перейти к корзине 🛒", "cartBtn")]);

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
  [Markup.button.text("Семейный")],
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

module.exports.commands = commands;
module.exports.chat_id = chat_id;
module.exports.mainKeyboard = mainKeyboard;
module.exports.cartKeyboard = cartKeyboard;
module.exports.menuKeyboard = menuKeyboard;
module.exports.sizeKeyboard = sizeKeyboard;
module.exports.contactKeyboard = contactKeyboard;
