'use strict'

const { parse } = require('dotenv')
const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)

const { catalog } = require('./catalog')
const constants = require('./constants')

const userData = []
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
  ctx.reply(`Выберите категорию`, constants.menuKeyboard)
})
bot.hears('Меню 📒', async (ctx) => {
  ctx.reply(`Выберите категорию`, constants.menuKeyboard)
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
        ...Markup.inlineKeyboard([
          Markup.button.callback('Добавить в корзину 🛒', food_name),
        ]),
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
      bot.on('message', async (ctx) => {

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
            \nДобавлено✅
            `,
            constants.cartKeyboard
          )

          await ctx.reply('Хотите заказать что-то еще?', constants.menuKeyboard)
          for (const key in order) cart.push({[key]: order[key]}), delete order[key]

        } else {
          return await ctx.reply(
            'Количество должно быть в цифровом формате и выше нуля. Повторите попытку.'
          )
        }
      })
    })
  })
}

makePublication(catalog[0].category, catalog[0].url, catalog[0].description, catalog[0].name)
addToCart(catalog[0].name, catalog[0].price.price1, catalog[0].price.price2, catalog[0].price.price3)

makePublication(catalog[1].category, catalog[1].url, catalog[1].description, catalog[1].name)
addToCart(catalog[1].name, catalog[1].price.price1, catalog[1].price.price2, catalog[1].price.price3)

makePublication(catalog[2].category, catalog[2].url, catalog[2].description, catalog[2].name)
addToCart(catalog[2].name, catalog[2].price.price1, catalog[2].price.price2, catalog[2].price.price3)

makePublication(catalog[3].category, catalog[3].url, catalog[3].description, catalog[3].name)
addToCart(catalog[3].name, catalog[3].price.price1, catalog[3].price.price2, catalog[3].price.price3)

makePublication(catalog[4].category, catalog[4].url, catalog[4].description, catalog[4].name)
addToCart(catalog[4].name, catalog[4].price.price1, catalog[4].price.price2, catalog[4].price.price3)

makePublication(catalog[5].category, catalog[5].url, catalog[5].description, catalog[5].name)
addToCart(catalog[5].name, catalog[5].price.price1, catalog[5].price.price2, catalog[5].price.price3)

makePublication(catalog[6].category, catalog[6].url, catalog[6].description, catalog[6].name)
addToCart(catalog[6].name, catalog[6].price.price1, catalog[6].price.price2, catalog[6].price.price3)

bot.action('cartBtn', async (ctx) => {})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
