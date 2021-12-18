'use strict'

require('dotenv').config()
const { parse } = require('dotenv')
const { Telegraf, Markup } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const { catalog, ...constants } = require('./constants')

const userData = {}
const orderData = {}
const orderPrices = []
const cartData = []

let userName
let orderPrice


bot.start( async context => {
  try {

    userName = context.from.first_name ?? context.from.last_name ?? context.from.username

    await context.reply(
      `Здравствуйте ${userName}! Добро пожаловать в бот доставки еды. \nВыберите дальнейшее действие`,
      constants.mainKeyboard
    )

  } catch (error) {
    console.error(error)
  }
})

bot.hears('На главную ⬅️', async context => {
  try {

    userName = context.from.first_name ?? context.from.last_name ?? context.from.username

    await context.reply(
      `Здравствуйте еще раз ${userName}! \nВыберите дальнейшее действие`,
      constants.mainKeyboard
    )

  } catch (error) {
    console.error(error)
  }
})

bot.command('menu', async context => {
  try {

    await context.reply('Выберите категорию', constants.menuKeyboard)

  } catch (error) {
    console.error(error)
  }
})

bot.hears('Меню 📒', async context => {
  try {

    await context.reply('Выберите категорию', constants.menuKeyboard)

  } catch (error) {
    console.error(error)
  }
})

bot.help( async context => {
  try {

    await context.reply(constants.commands)

  } catch (error) {
    console.error(error)
  }
})

async function addPost(foodCategory, imageSource, captiontext, foodName) {
  try {

    bot.hears(foodCategory, async context => {
      await context.replyWithPhoto(
        { url: imageSource },
        {
          parse_mode: 'Markdown',
          caption: captiontext,
          ...Markup.inlineKeyboard([ Markup.button.callback('Добавить в корзину 🛒', foodName) ])
        }
      )
    })

  } catch (error) {
    console.error(error)
  }
}

async function addToCart(priceOne, priceTwo, priceThree) {
  try {

    bot.on('callback_query', async context => {
      orderData['order'] = await context.update.callback_query.data

      await context.reply('Выберите размер', constants.sizeKeyboard)

      bot.hears(['Средний', 'Большой', 'Семейный'], async context => {
        orderData['size'] = context.message.text

        await context.reply('Теперь введите количество')

        bot.on('text', async context => {
          if (context.message.text ** 1) {
            orderData['count'] = context.message.text ** 1 + ' шт'

            await showLastOrder(context, priceOne, priceTwo, priceThree)

            orderPrices.push({ price: orderData.price, count: orderData.count, })
            for (const key in orderData) cartData.push(orderData[key]), delete orderData[key]

            await context.reply('Хотите заказать что-то еще?', constants.menuKeyboard)

          } else await context.reply('Введите данные в требуемом формате')
        })
      })
    })

  } catch (error) {
    console.error(error)
  }
}

bot.command('cart', async context => {
  try {

    if (cartData.length !== 0) {

      orderPrice = await orderPrices.reduce((sum, current) => sum + parseInt(current.price) * parseInt(current.count), 0)

      await showAllOrder(context)

    } else await context.reply('Ваша корзина пустая. Закажите что-нибудь', constants.menuKeyboard)

  } catch (error) {
    console.error(error)
  }
})

bot.action('cartBtn', async context => {
  try {

    if (cartData.length !== 0) {

      orderPrice = await orderPrices.reduce((sum, current) => sum + parseInt(current.price) * parseInt(current.count), 0)

      await showAllOrder(context)

    } else await context.reply('Ваша корзина пустая. Закажите что-нибудь', constants.menuKeyboard)

    } catch (error) {
    console.error(error)
  }
})

bot.action('makeOrder', async context => {
  try {

    if (cartData.length !== 0) {

      await context.reply('Оставьте свои контакты воспользовшись кнопкой', constants.contactKeyboard)

      bot.on('contact', async context => {

        for (const key in context.message.contact) userData[key] = await context.message.contact[key]

        orderPrice = await orderPrices.reduce((sum, current) => sum + parseInt(current.price) * parseInt(current.count), 0)

        await showByeMessage(context)

        await sendOrderToGroup(context)

        await deleteItemsInArray(cartData), await deleteItemsInArray(orderPrices), await deleteItemsInObject(userData)
      })

    } else await context.reply('Вы еще не заказли ничего. Закажите', constants.menuKeyboard)

    } catch (error) {
    console.error(error)
  }
})

bot.action('cleanCart', async context => {
  try {

    await deleteItemsInArray(cartData), await deleteItemsInArray(orderPrices), await deleteItemsInObject(userData)

    await context.reply('Ваша корзина очищена')

  } catch (error) {
    console.error(error)
  }
})

addPost(catalog[0].category, catalog[0].url, catalog[0].description, catalog[0].name)
addToCart(catalog[0].price.price1, catalog[0].price.price2, catalog[0].price.price3)

addPost(catalog[1].category, catalog[1].url, catalog[1].description, catalog[1].name)
addToCart(catalog[1].price.price1, catalog[1].price.price2, catalog[1].price.price3)

addPost(catalog[2].category, catalog[2].url, catalog[2].description, catalog[2].name)
addToCart(catalog[2].price.price1, catalog[2].price.price2, catalog[2].price.price3)

addPost(catalog[3].category, catalog[3].url, catalog[3].description, catalog[3].name)
addToCart(catalog[3].price.price1, catalog[3].price.price2, catalog[3].price.price3)

addPost(catalog[4].category, catalog[4].url, catalog[4].description, catalog[4].name)
addToCart(catalog[4].price.price1, catalog[4].price.price2, catalog[4].price.price3)

addPost(catalog[5].category, catalog[5].url, catalog[5].description, catalog[5].name)
addToCart(catalog[5].price.price1, catalog[5].price.price2, catalog[5].price.price3)

addPost(catalog[6].category, catalog[6].url, catalog[6].description, catalog[6].name)
addToCart(catalog[6].price.price1, catalog[6].price.price2, catalog[6].price.price3)

addPost(catalog[7].category, catalog[7].url, catalog[7].description, catalog[7].name)
addToCart(catalog[7].price.price1, catalog[7].price.price2, catalog[7].price.price3)

addPost(catalog[8].category, catalog[8].url, catalog[8].description, catalog[8].name)
addToCart(catalog[8].price.price1, catalog[8].price.price2, catalog[8].price.price3)

addPost(catalog[9].category, catalog[9].url, catalog[9].description, catalog[9].name)
addToCart(catalog[9].price.price1, catalog[9].price.price2, catalog[9].price.price3)

addPost(catalog[10].category, catalog[10].url, catalog[10].description, catalog[10].name)
addToCart(catalog[10].price.price1, catalog[10].price.price2, catalog[10].price.price3)

addPost(catalog[11].category, catalog[11].url, catalog[11].description, catalog[11].name)
addToCart(catalog[11].price.price1, catalog[11].price.price2, catalog[11].price.price3)

addPost(catalog[12].category, catalog[12].url, catalog[12].description, catalog[12].name)
addToCart(catalog[12].price.price1, catalog[12].price.price2, catalog[12].price.price3)

addPost(catalog[13].category, catalog[13].url, catalog[13].description, catalog[13].name)
addToCart(catalog[13].price.price1, catalog[13].price.price2, catalog[13].price.price3)

addPost(catalog[14].category, catalog[14].url, catalog[14].description, catalog[14].name)
addToCart(catalog[14].price.price1, catalog[14].price.price2, catalog[14].price.price3)

addPost(catalog[15].category, catalog[15].url, catalog[15].description, catalog[15].name)
addToCart(catalog[15].price.price1, catalog[15].price.price2, catalog[15].price.price3)

addPost(catalog[16].category, catalog[16].url, catalog[16].description, catalog[16].name)
addToCart(catalog[16].price.price1, catalog[16].price.price2, catalog[16].price.price3)

addPost(catalog[17].category, catalog[17].url, catalog[17].description, catalog[17].name)
addToCart(catalog[17].price.price1, catalog[17].price.price2, catalog[17].price.price3)

addPost(catalog[18].category, catalog[18].url, catalog[18].description, catalog[18].name)
addToCart(catalog[18].price.price1, catalog[18].price.price2, catalog[18].price.price3)

addPost(catalog[19].category, catalog[19].url, catalog[19].description, catalog[19].name)
addToCart(catalog[19].price.price1, catalog[19].price.price2, catalog[19].price.price3)

addPost(catalog[20].category, catalog[20].url, catalog[20].description, catalog[20].name)
addToCart(catalog[20].price.price1, catalog[20].price.price2, catalog[20].price.price3)

addPost(catalog[21].category, catalog[21].url, catalog[21].description, catalog[21].name)
addToCart(catalog[21].price.price1, catalog[21].price.price2, catalog[21].price.price3)

addPost(catalog[22].category, catalog[22].url, catalog[22].description, catalog[22].name)
addToCart(catalog[22].price.price1, catalog[22].price.price2, catalog[22].price.price3)

addPost(catalog[23].category, catalog[23].url, catalog[23].description, catalog[23].name)
addToCart(catalog[23].price.price1, catalog[23].price.price2, catalog[23].price.price3)

addPost(catalog[24].category, catalog[24].url, catalog[24].description, catalog[24].name)
addToCart(catalog[24].price.price1, catalog[24].price.price2, catalog[24].price.price3)

addPost(catalog[25].category, catalog[25].url, catalog[25].description, catalog[25].name)
addToCart(catalog[25].price.price1, catalog[25].price.price2, catalog[25].price.price3)

addPost(catalog[26].category, catalog[26].url, catalog[26].description, catalog[26].name)
addToCart(catalog[26].price.price1, catalog[26].price.price2, catalog[26].price.price3)

addPost(catalog[27].category, catalog[27].url, catalog[27].description, catalog[27].name)
addToCart(catalog[27].price.price1, catalog[27].price.price2, catalog[27].price.price3)

addPost(catalog[28].category, catalog[28].url, catalog[28].description, catalog[28].name)
addToCart(catalog[28].price.price1, catalog[28].price.price2, catalog[28].price.price3)

addPost(catalog[29].category, catalog[29].url, catalog[29].description, catalog[29].name)
addToCart(catalog[29].price.price1, catalog[29].price.price2, catalog[29].price.price3)

addPost(catalog[30].category, catalog[30].url, catalog[30].description, catalog[30].name)
addToCart(catalog[30].price.price1, catalog[30].price.price2, catalog[30].price.price3)

addPost(catalog[31].category, catalog[31].url, catalog[31].description, catalog[31].name)
addToCart(catalog[31].price.price1, catalog[31].price.price2, catalog[31].price.price3)

addPost(catalog[32].category, catalog[32].url, catalog[32].description, catalog[32].name)
addToCart(catalog[32].price.price1, catalog[32].price.price2, catalog[32].price.price3)

async function deleteItemsInObject(objectName) {
  try {

    for (const objectItem in objectName) delete objectName[objectItem]

  } catch (error) {
    console.error(error)
  }
}

async function deleteItemsInArray(arrayName) {
  try {

    arrayName.length = 0

  } catch (error) {
    console.error(error)
  }
}

async function showAllOrder(context) {
  try {

    await context.reply(
      `Ваши заказы: \n\n${cartData.join('\n')} \n\nИтого: ${orderPrice} сомон`,
      constants.orderKeyBoard
    )

  } catch (error) {
    console.error(error)
  }
}

async function showByeMessage(context) {
  try {

    await context.reply(
      `Спасибо ${userData.first_name ?? userData.last_name}! С номерами ${
        userData.phone_number
      } в скором времени свяжутся для уточнения адреса доставки!`,
      constants.mainKeyboard
    )

  } catch (error) {
    console.error(error)
  }
}

async function sendOrderToGroup(context) {
  try {

    await context.telegram.sendMessage(
      constants.chat_id,
      `Данные заказа: \n\nНа имя: *${
        userData.first_name ?? userData.last_name
      }* \nТелефон: *+${userData.phone_number}* \nЗаказ: *\n${cartData.join(
        '\n'
      )}*\n\nИтого: *${orderPrice} сомон*`,
      { parse_mode: 'Markdown' }
    )

  } catch (error) {
    console.error(error)
  }
}

async function showLastOrder(context, priceOne, priceTwo, priceThree) {
  try {

    await context.replyWithMarkdown(
      `Заказ: *${orderData.order}* \nЦена: *${
        orderData.size === 'Средний'
          ? (priceOne, (orderData['price'] = priceOne + ' сомон'))
          : orderData.size === 'Большой'
          ? (priceTwo, (orderData['price'] = priceTwo + ' сомон'))
          : orderData.size === 'Семейный'
          ? (priceThree, (orderData['price'] = priceThree + ' сомон'))
          : 'Не определено'
      }* \nКоличество: *${orderData.count}* \nРазмер: *${orderData.size}*
    \nДобавлено ✅
    `,
      constants.cartKeyboard
    )

  } catch (error) {
    console.error(error)
  }
}

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
