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
  ctx.reply(
    `Здравствуйте ${
      ctx.from.first_name ?? ctx.from.last_name ?? ctx.from.username
    }! Добро пожаловать в бот доставки еды.
    \nВыберите дальнейшее действие.`,
    constants.mainKeyboard
  )
})

bot.hears('На главную ⬅️', async (ctx) => {
  ctx.reply(
    `Здравствуйте еще раз ${
      ctx.from.first_name ?? ctx.from.last_name ?? ctx.from.username
    }!
    \nВыберите желаемое действие.`,
    constants.mainKeyboard
  )
})

bot.command('menu', async (ctx) => {
  ctx.reply('Выберите категорию', constants.menuKeyboard)
})

bot.hears('Меню 📒', async (ctx) => {
  ctx.reply('Выберите категорию', constants.menuKeyboard)
})

bot.help(async (ctx) => {
  ctx.reply(constants.commands)
})

async function makePublication(category_food, img_src, caption_txt, food_name) {
  bot.hears(category_food, async (ctx) => {
    ctx.replyWithPhoto(
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
  bot.action(food_name,  async (ctx) => {

    order['order'] = ctx.update.callback_query.data
    await ctx.reply('Выберите размер', constants.sizeKeyboard)
    bot.hears(['Средний', 'Большой', 'Семейный'], async (ctx) => {

      order['size'] = ctx.message.text
      await ctx.reply('Теперь введите количество')
      bot.on('text', async (ctx) => {

        if (ctx.message.text ** 1) {
          order['count'] = ctx.message.text ** 1

          await ctx.replyWithMarkdown(
            `Заказ: *${order.order}* \nЦена: *${
              order.size === 'Средний'
                ? price_1
                : order.size === 'Большой'
                ? price_2
                : order.size === 'Семейный'
                ? price_3
                : 'Не определено'
            }* \nКоличество: *${order.count}* \nРазмер: *${order.size}*
            \nДобавлено ✅
            `,
            constants.cartKeyboard
          )

          for (const key in order) cart.push(order[key]), delete order[key]
          await ctx.reply('Хотите заказать что-то еще?', constants.menuKeyboard)

        } else return await ctx.reply('Количество должно быть в цифровом формате и выше нуля. Повторите попытку.')
      })
    })
  })
}

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
    })
  }
  else await ctx.reply('Вы еще не заказли ничего. Закажите', constants.menuKeyboard)
})

bot.action('cleanCart', async (ctx) => {
  cart.length = 0
  for (const key in userData) delete userData[key]
  await ctx.reply('Ваша корзина очищена')
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
