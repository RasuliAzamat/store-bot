'use strict'

require('dotenv').config()
const { parse } = require('dotenv')
const { Telegraf, Markup } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const constants = require('./constants')

const userData = {}
const order = {}
const cart = []

bot.start(async (ctx) => {
  await ctx.reply(
    `Здравствуйте ${
      ctx.from.first_name ?? ctx.from.last_name ?? ctx.from.username
    }! Добро пожаловать в бот доставки еды.
    \nВыберите дальнейшее действие.`,
    constants.mainKeyboard
  )
})

bot.hears('На главную ⬅️', async (ctx) => {
  await ctx.reply(
    `Здравствуйте еще раз ${
      ctx.from.first_name ?? ctx.from.last_name ?? ctx.from.username
    }!
    \nВыберите желаемое действие.`,
    constants.mainKeyboard
  )
})

bot.command('menu', async (ctx) => {await ctx.reply('Выберите категорию', constants.menuKeyboard)})

bot.hears('Меню 📒', async (ctx) => {await ctx.reply('Выберите категорию', constants.menuKeyboard)})

bot.help(async (ctx) => {await ctx.reply(constants.commands)})

async function makePublication(category_food, img_src, caption_txt, food_name) {
  bot.hears(category_food, async (ctx) => {
    await ctx.replyWithPhoto(
      { url: img_src },
      {
        parse_mode: 'Markdown',
        caption: caption_txt,
        ...Markup.inlineKeyboard([Markup.button.callback('Добавить в корзину 🛒', food_name)]),
      }
    )
  })
}

async function addToCart(food_name, price_1, price_2, price_3) {
  bot.action(food_name, async (ctx) => {

    order['order'] = ctx.update.callback_query.data
    await ctx.reply('Выберите размер', constants.sizeKeyboard)
    bot.hears(['Средний', 'Большой', 'Семейный'], async (ctx) => {

      order['size'] = ctx.message.text
      await ctx.reply('Теперь введите количество')
      bot.on('text', async (ctx) => {
        if (ctx.message.text ** 1) {

          order['count'] = ctx.message.text ** 1 + ' штук'
          await ctx.replyWithMarkdown(
            `Заказ: *${order.order}* \nЦена: *${
              order.size === 'Средний'
                ? (price_1, (order['price'] = price_1 + ' сомон'))
                : order.size === 'Большой'
                ? (price_2, (order['price'] = price_2 + ' сомон'))
                : order.size === 'Семейный'
                ? (price_3, (order['price'] = price_3 +  'сомон'))
                : 'Не определено'
            }* \nКоличество: *${order.count}* \nРазмер: *${order.size}*
            \nДобавлено ✅
            `,
            constants.cartKeyboard
          )

          for (const key in order) cart.push(order[key]), delete order[key]
          await ctx.reply('Хотите заказать что-то еще?', constants.menuKeyboard)

        } else await ctx.reply('Введите данные в требуемом формате')
      })
    })
  })
}

bot.command('cart', async (ctx) => {
  if (cart.length !== 0) await ctx.reply(`Ваши заказы: \n\n${cart.join('\n')}`, constants.orderKeyBoard)
  else await ctx.reply('Ваша корзина пустая. Закажите что-нибудь', constants.menuKeyboard)
})

bot.action('cartBtn', async (ctx) => {
  if (cart.length !== 0) await ctx.reply(`Ваши заказы: \n\n${cart.join('\n')}`, constants.orderKeyBoard)
  else await ctx.reply('Ваша корзина пустая. Закажите что-нибудь', constants.menuKeyboard)
})

bot.action('makeOrder', async (ctx) => {
  if (cart.length !== 0) {

    await ctx.reply('Оставьте свои контакты воспользовшись кнопкой', constants.contactKeyboard)
    bot.on('contact', async (ctx) => {

      for (const key in ctx.message.contact) userData[key] = ctx.message.contact[key]
      await ctx.reply(
        `Спасибо ${userData.first_name ?? userData.last_name}! С номерами +${
          userData.phone_number
        } в скором времени свяжутся для уточнения адреса доставки!`,
        constants.mainKeyboard
      )

      await ctx.replyWithMarkdown(
        `Данные заказа: \n\nНа имя: *${
          userData.first_name ?? userData.last_name
        }* \nТелефон: *+${userData.phone_number}* \nЗаказ: *\n${cart.join(
          '\n'
        )}*`
      )

      cart.length = 0
      for (const key in userData) delete userData[key]
    })
  }
  else await ctx.reply('Вы еще не заказли ничего. Закажите', constants.menuKeyboard)
})

bot.action('cleanCart', async (ctx) => {
  cart.length = 0
  for (const key in userData) delete userData[key]
  await ctx.reply('Ваша корзина очищена')
})

makePublication(constants.catalog[0].category, constants.catalog[0].url, constants.catalog[0].description, constants.catalog[0].name)
addToCart(constants.catalog[0].name, constants.catalog[0].price.price1, constants.catalog[0].price.price2, constants.catalog[0].price.price3)

makePublication(constants.catalog[1].category, constants.catalog[1].url, constants.catalog[1].description, constants.catalog[1].name)
addToCart(constants.catalog[1].name, constants.catalog[1].price.price1, constants.catalog[1].price.price2, constants.catalog[1].price.price3)

makePublication(constants.catalog[2].category, constants.catalog[2].url, constants.catalog[2].description, constants.catalog[2].name)
addToCart(constants.catalog[2].name, constants.catalog[2].price.price1, constants.catalog[2].price.price2, constants.catalog[2].price.price3)

makePublication(constants.catalog[3].category, constants.catalog[3].url, constants.catalog[3].description, constants.catalog[3].name)
addToCart(constants.catalog[3].name, constants.catalog[3].price.price1, constants.catalog[3].price.price2, constants.catalog[3].price.price3)

makePublication(constants.catalog[4].category, constants.catalog[4].url, constants.catalog[4].description, constants.catalog[4].name)
addToCart(constants.catalog[4].name, constants.catalog[4].price.price1, constants.catalog[4].price.price2, constants.catalog[4].price.price3)

makePublication(constants.catalog[5].category, constants.catalog[5].url, constants.catalog[5].description, constants.catalog[5].name)
addToCart(constants.catalog[5].name, constants.catalog[5].price.price1, constants.catalog[5].price.price2, constants.catalog[5].price.price3)

makePublication(constants.catalog[6].category, constants.catalog[6].url, constants.catalog[6].description, constants.catalog[6].name)
addToCart(constants.catalog[6].name, constants.catalog[6].price.price1, constants.catalog[6].price.price2, constants.catalog[6].price.price3)

makePublication(constants.catalog[7].category, constants.catalog[7].url, constants.catalog[7].description, constants.catalog[7].name)
addToCart(constants.catalog[7].name, constants.catalog[7].price.price1, constants.catalog[7].price.price2, constants.catalog[7].price.price3)

makePublication(constants.catalog[8].category, constants.catalog[8].url, constants.catalog[8].description, constants.catalog[8].name)
addToCart(constants.catalog[8].name, constants.catalog[8].price.price1, constants.catalog[8].price.price2, constants.catalog[8].price.price3)

makePublication(constants.catalog[9].category, constants.catalog[9].url, constants.catalog[9].description, constants.catalog[9].name)
addToCart(constants.catalog[9].name, constants.catalog[9].price.price1, constants.catalog[9].price.price2, constants.catalog[9].price.price3)

makePublication(constants.catalog[10].category, constants.catalog[10].url, constants.catalog[10].description, constants.catalog[10].name)
addToCart(constants.catalog[10].name, constants.catalog[10].price.price1, constants.catalog[10].price.price2, constants.catalog[10].price.price3)

makePublication(constants.catalog[11].category, constants.catalog[11].url, constants.catalog[11].description, constants.catalog[11].name)
addToCart(constants.catalog[11].name, constants.catalog[11].price.price1, constants.catalog[11].price.price2, constants.catalog[11].price.price3)

makePublication(constants.catalog[12].category, constants.catalog[12].url, constants.catalog[12].description, constants.catalog[12].name)
addToCart(constants.catalog[12].name, constants.catalog[12].price.price1, constants.catalog[12].price.price2, constants.catalog[12].price.price3)

makePublication(constants.catalog[13].category, constants.catalog[13].url, constants.catalog[13].description, constants.catalog[13].name)
addToCart(constants.catalog[13].name, constants.catalog[13].price.price1, constants.catalog[13].price.price2, constants.catalog[13].price.price3)

makePublication(constants.catalog[14].category, constants.catalog[14].url, constants.catalog[14].description, constants.catalog[14].name)
addToCart(constants.catalog[14].name, constants.catalog[14].price.price1, constants.catalog[14].price.price2, constants.catalog[14].price.price3)

makePublication(constants.catalog[15].category, constants.catalog[15].url, constants.catalog[15].description, constants.catalog[15].name)
addToCart(constants.catalog[15].name, constants.catalog[15].price.price1, constants.catalog[15].price.price2, constants.catalog[15].price.price3)

makePublication(constants.catalog[16].category, constants.catalog[16].url, constants.catalog[16].description, constants.catalog[16].name)
addToCart(constants.catalog[16].name, constants.catalog[16].price.price1, constants.catalog[16].price.price2, constants.catalog[16].price.price3)

makePublication(constants.catalog[17].category, constants.catalog[17].url, constants.catalog[17].description, constants.catalog[17].name)
addToCart(constants.catalog[17].name, constants.catalog[17].price.price1, constants.catalog[17].price.price2, constants.catalog[17].price.price3)

makePublication(constants.catalog[18].category, constants.catalog[18].url, constants.catalog[18].description, constants.catalog[18].name)
addToCart(constants.catalog[18].name, constants.catalog[18].price.price1, constants.catalog[18].price.price2, constants.catalog[18].price.price3)

makePublication(constants.catalog[19].category, constants.catalog[19].url, constants.catalog[19].description, constants.catalog[19].name)
addToCart(constants.catalog[19].name, constants.catalog[19].price.price1, constants.catalog[19].price.price2, constants.catalog[19].price.price3)

makePublication(constants.catalog[20].category, constants.catalog[20].url, constants.catalog[20].description, constants.catalog[20].name)
addToCart(constants.catalog[20].name, constants.catalog[20].price.price1, constants.catalog[20].price.price2, constants.catalog[20].price.price3)

makePublication(constants.catalog[21].category, constants.catalog[21].url, constants.catalog[21].description, constants.catalog[21].name)
addToCart(constants.catalog[21].name, constants.catalog[21].price.price1, constants.catalog[21].price.price2, constants.catalog[21].price.price3)

makePublication(constants.catalog[22].category, constants.catalog[22].url, constants.catalog[22].description, constants.catalog[22].name)
addToCart(constants.catalog[22].name, constants.catalog[22].price.price1, constants.catalog[22].price.price2, constants.catalog[22].price.price3)

makePublication(constants.catalog[23].category, constants.catalog[23].url, constants.catalog[23].description, constants.catalog[23].name)
addToCart(constants.catalog[23].name, constants.catalog[23].price.price1, constants.catalog[23].price.price2, constants.catalog[23].price.price3)

makePublication(constants.catalog[24].category, constants.catalog[24].url, constants.catalog[24].description, constants.catalog[24].name)
addToCart(constants.catalog[24].name, constants.catalog[24].price.price1, constants.catalog[24].price.price2, constants.catalog[24].price.price3)

makePublication(constants.catalog[25].category, constants.catalog[25].url, constants.catalog[25].description, constants.catalog[25].name)
addToCart(constants.catalog[25].name, constants.catalog[25].price.price1, constants.catalog[25].price.price2, constants.catalog[25].price.price3)

makePublication(constants.catalog[26].category, constants.catalog[26].url, constants.catalog[26].description, constants.catalog[26].name)
addToCart(constants.catalog[26].name, constants.catalog[26].price.price1, constants.catalog[26].price.price2, constants.catalog[26].price.price3)

makePublication(constants.catalog[27].category, constants.catalog[27].url, constants.catalog[27].description, constants.catalog[27].name)
addToCart(constants.catalog[27].name, constants.catalog[27].price.price1, constants.catalog[27].price.price2, constants.catalog[27].price.price3)

makePublication(constants.catalog[28].category, constants.catalog[28].url, constants.catalog[28].description, constants.catalog[28].name)
addToCart(constants.catalog[28].name, constants.catalog[28].price.price1, constants.catalog[28].price.price2, constants.catalog[28].price.price3)

makePublication(constants.catalog[29].category, constants.catalog[29].url, constants.catalog[29].description, constants.catalog[29].name)
addToCart(constants.catalog[29].name, constants.catalog[29].price.price1, constants.catalog[29].price.price2, constants.catalog[29].price.price3)

makePublication(constants.catalog[30].category, constants.catalog[30].url, constants.catalog[30].description, constants.catalog[30].name)
addToCart(constants.catalog[30].name, constants.catalog[30].price.price1, constants.catalog[30].price.price2, constants.catalog[30].price.price3)

makePublication(constants.catalog[31].category, constants.catalog[31].url, constants.catalog[31].description, constants.catalog[31].name)
addToCart(constants.catalog[31].name, constants.catalog[31].price.price1, constants.catalog[31].price.price2, constants.catalog[31].price.price3)

makePublication(constants.catalog[32].category, constants.catalog[32].url, constants.catalog[32].description, constants.catalog[32].name)
addToCart(constants.catalog[32].name, constants.catalog[32].price.price1, constants.catalog[32].price.price2, constants.catalog[32].price.price3)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
