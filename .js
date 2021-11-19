/* 
--------------------------------------------------------------------------------------------------------------------------
*/
const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const allVariables = require("./variables");
const bot = new Telegraf(process.env.BOT_TOKEN);
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.start((ctx) => {
  ctx.reply(
    `Здравствуйте ${ctx.from.first_name}! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
    Markup.keyboard([
      Markup.button.text("Меню 📒"),
      Markup.button.text("Корзина 🛒"),
    ]).resize()
  );
});
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.hears("На главную ⬅️", (ctx) => {
  ctx.reply(
    `Здравствуйте ${ctx.from.first_name}! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
    Markup.keyboard([
      Markup.button.text("Меню 📒"),
      Markup.button.text("Корзина 🛒"),
    ]).resize()
  );
});
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.command("menu", async (ctx) => {
  await ctx.reply(
    `Выберите категорию.`,
    Markup.keyboard([
      [Markup.button.text("Пиццы 🍕")],
      [Markup.button.text("Бургеры 🍔"), Markup.button.text("Паста 🍝")],
      [Markup.button.text("Гарниры 🍟"), Markup.button.text("Салаты 🥗")],
      [Markup.button.text("Напитки 🥤"), Markup.button.text("Дессерты 🍰")],
      [Markup.button.text("Бургеры 🍔"), Markup.button.text("Паста 🍝")],
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
      [Markup.button.text("Пиццы 🍕")],
      [Markup.button.text("Бургеры 🍔"), Markup.button.text("Паста 🍝")],
      [Markup.button.text("Гарниры 🍟"), Markup.button.text("Салаты 🥗")],
      [Markup.button.text("Напитки 🥤"), Markup.button.text("Дессерты 🍰")],
      [Markup.button.text("Бургеры 🍔"), Markup.button.text("Паста 🍝")],
      [Markup.button.text("На главную ⬅️")],
    ])
      .resize()
      .oneTime()
  );
});
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
function the() {
  function showPublicaton(
    title,
    src_img,
    parsing_publication,
    parsing_text,
    caption_txt,
    btn_text,
    btn_callback
  ) {
    bot.hears(title, async (ctx) => {
      await ctx.replyWithPhoto(
        {
          url: src_img,
        },
        {
          parse_mode: parsing_publication,
          parse_mode: parsing_text,
          caption: caption_txt,
          ...Markup.inlineKeyboard([
            Markup.button.callback(btn_text, btn_callback),
          ]),
        }
      );
    });
  }
}

// showPublicaton(
//   "Пиццы 🍕",
//   "https://bellapizza.tj/wp-content/uploads/2020/12/shaurmapizza-300x300.jpg",
//   "Markdown",
//   "HTML",
//   "caption text",
//   "btn text",
//   "btn_id"
// );

bot.hears("Пиццы 🍕", async (ctx) => {
  {
    const pizza_1 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2020/12/shaurmapizza-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Шаурма пицца</b>\nБелла Соус, Моцарелла, Пепперони, Пеперончини\n\nСредняя 72сом\nБольшая 85сом\nСупер семейная 116сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_1[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_2 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2020/09/%D0%BF%D0%B8%D0%BA%D0%B0%D0%BD%D1%82%D0%B0-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Пиканта</b>\nБелла Соус, Моцарелла, Пепперони, Пеперончини\n\nСредняя 72сом\nБольшая 82сом\nСупер семейная 112сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_2[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_3 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/12/%D0%BA%D0%B0%D1%80%D1%80%D0%B8-%D1%81-%D0%BA%D1%83%D1%80%D0%B8%D1%86%D0%B5%D0%B9-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Карри с курицей</b>\nСоус Карри, Моцарелла, запечённая курица, Псомидоры, Болгарский перец, кинза, грибы\n\nСредняя 72сом\nБольшая 85сом\nСупер семейная 116сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_3[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_4 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/12/%D0%BA%D0%B0%D1%80%D1%80%D0%B8-%D0%B2%D0%B5%D0%B3%D0%B5%D1%82%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Карри вегетарианская</b>\nСоус Карри, Моцарелла, Свежий сыр, Псомидоры, Болгарский перец,  Грибы, Кинза\n\nСредняя 71сом\nБольшая 81сом\nСупер семейная 110сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_4[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_5 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/10/%D0%BC%D0%B0%D1%80%D0%B8%D0%BD%D0%B0%D1%80%D0%B0-%D1%81-%D1%84%D0%B0%D1%80%D1%88%D0%B5%D0%BC-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Маринара с Фаршем</b>\nМаринара Соус, Моцарелла, кусочки мяса из говяжьего фарша, грибы, оливки, базилик и Пармезан\n\nСредняя 76сом\nБольшая 87сом\nСупер семейная 116сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_5[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_6 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/04/grecheskaya-1-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Греческая</b>\nБелла Соус, Моцарелла, Болгарский перец, Псомидоры, красный лук, сыр фета, оливки\n\nСредняя 71сом\nБольшая 81сом\nСупер семейная 110сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_6[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_7 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/gribnaya-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Грибная</b>\nБелла Соус, Моцарелла, Грибы\n\nСредняя 68сом\nБольшая 76сом\nСупер семейная 100сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_7[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_8 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/gavayskaya-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Гавайская</b>\nБелла Соус, Моцарелла, говяжья ветчина, ананас\n\nСредняя 71сом\nБольшая 81сом\nСупер семейная 110сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_8[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_9 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/%D0%BC%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Маргарита</b>\nБелла Соус, Моцарелла, говяжья ветчина, ананас\n\nСредняя 62сом\nБольшая 71сом\nСупер семейная 91сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_9[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_10 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/%D0%BF%D0%B5%D0%BF%D0%BF%D0%B5%D1%80%D0%BE%D0%BD%D0%B8-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Пепперони</b>\nБелла Соус, Моцарелла, Пепперони\n\nСредняя 68сом\nБольшая 78сом\nСупер семейная 110сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_10[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_11 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/%D1%81%D1%8B%D1%80%D0%BD%D0%B0%D1%8F-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Сырная</b>\nБелла Соус, Моцарелла, Орегано\n\nСредняя 58сом\nБольшая 68сом\nСупер семейная 89сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_11[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_12 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/vegatiryanskaya-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Вегетарианская</b>\nБелла Соус, Моцарелла, Грибы, Псомидоры, Болгарский перец, Баклажан\Кабачки, оливки\n\nСредняя 71сом\nБольшая 81сом\nСупер семейная 110сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_12[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_13 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/%D0%BC%D0%B5%D0%BA%D1%81%D0%B8%D0%BA%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Мексиканская</b>\nОстрый Белла Соус, Моцарелла, говядина Карне Асада, острый перец халапеньо, Псомидоры, Кинза, сок лимона\n\nСредняя 72сом\nБольшая 85сом\nСупер семейная 116сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_13[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_14 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/%D0%BA%D1%83%D1%80%D0%B8%D0%BD%D0%B0%D1%8F-%D1%81-%D0%B1%D0%B5%D0%BB%D1%8B%D0%BC-%D1%81%D0%BE%D1%83%D1%81%D0%BE%D0%BC-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Куриная с белым соусом</b>\nЧесночный Белый Соус, Моцарелла, Курица запеченая, соус Песто, петрушка\n\nСредняя 72сом\nБольшая 85сом\nСупер семейная 116сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_14[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_15 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/%D0%B8%D1%82%D0%B0%D0%BB%D1%8C%D1%8F%D0%BD%D1%81%D0%BA%D0%B0%D1%8F-%D1%81-%D0%BC%D1%8F%D1%81%D0%BE%D0%BC-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Итальянская с мясом</b>\nМаринара Соус, Моцарелла, кусочки мяса из говяжьего фарша, Псомидоры, Оливки, Болгарский перец, Карамелизированный Лук, смесь итальянских специй\n\nСредняя 76сом\nБольшая 87сом\nСупер семейная 110сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_15[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_16 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/%D0%BA%D1%83%D1%80%D0%B8%D0%BD%D0%B0%D1%8F-%D0%B1%D0%B0%D1%80%D0%B1%D0%B5%D0%BA%D1%8E-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Куриная барбекю</b>\nБарбекю Соус, Моцарелла, Курица Барбекю, Лук, Кинза\n\nСредняя 72сом\nБольшая 85сом\nСупер семейная 116сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_16[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pizza_17 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/assorti-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Куриная барбекю</b>\nБелла Соус, Моцарелла, кусочки мяса из говяжьего фарша, Пепперони, Грибы, Оливки, Псомидоры, Болгарский перец\n\nСредняя 76сом\nБольшая 87сом\nСупер семейная 121сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart_pizza"),
          ]),
        }
      ),
    ];
    const btn_cart_pizza = pizza_17[0].reply_markup.inline_keyboard[0][0].text;
  }
});
/*
--------------------------------------------------------------------------------------------------------------------------
*/
bot.hears("Бургеры 🍔", async (ctx) => {
  {
    const burger_1 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2020/09/steakburger-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Стейк Сэндвич</b>\nКусочки говядины, грибы, лук, болгарский перец, чесночный соус\n\nОдин размер 47сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = burger_1[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const burger_2 = [
      await ctx.replyWithPhoto(
        {
          url: "bellapizza.tj/wp-content/uploads/2020/09/clubsendvich-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Клаб Сэндвич</b>\nЗапеченное куриное филе, сыр, псомидор, лист салата, соленый огурец, чесночный соус\n\nОдин размер 42сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = burger_2[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const burger_3 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/10/chickenburger-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Куриный бургер</b>\nБулочка, куриная котлета, псомидор, соленый огурец, лук, лист салата, соус\n\nОдин размер 29сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = burger_3[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const burger_4 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/bigbella-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Биг Белла</b>\nБулочка, две говяжьи котлеты, сыр, псомидор, соленый огурец, лук, лист салата, соус Биг Белла\n\nОдин размер 63сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = burger_4[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const burger_5 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/newyorkburger-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Нью-Йорк Бургер</b>\nБулочка, говяжья котлета, сыр, грибы, гриль-лук, горчичный соус\n\nОдин размер 42сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = burger_5[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const burger_6 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/cheesburger-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Чизбургер</b>\nБулочка, говяжья котлета, сыр, псомидор, соленый огурец, лук, лист салата, соус Ранч\n\nОдин размер 40сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = burger_6[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const burger_7 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/klassic.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Классический</b>\nБулочка, говяжья котлета, псомидор, соленый огурец, лук, лист салата, соус Ранч\n\nОдин размер 39сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = burger_7[0].reply_markup.inline_keyboard[0][0].text;
  }
});
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.hears("Паста 🍝", async (ctx) => {
  {
    const pasta_1 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/pennearabiata-1-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Пенне Арабиатта</b>\nПенне, Аррабиата соус, Пармезан, Чеснок\n\nОдин размер 21сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = pasta_1[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pasta_2 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/fusili-2-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Фусили в Сливочно-грибнсом соусе</b>\nФусили, Альфредо соус, грибы, пармезан, чеснок\n\nОдин размер 23сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = pasta_2[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pasta_3 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/mcheese-1-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Мак-н-чиз</b>\nМакароны, Альфредо соус, чедер, гауда, пармезан, чеснок\n\nОдин размер 18сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = pasta_3[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pasta_4 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/fetuchini-1-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Фетучини Альфредо с Курицей</b>\nФетучини, Альфредо соус, запечённая курица, пармезан, чеснок\n\nОдин размер 26сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = pasta_4[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pasta_5 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/pennebolonezza-1-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Пенне Болоньезе</b>\nПенне, Мясной Болоньезе соус, пармезан, чеснок\n\nОдин размер 26сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = pasta_5[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const pasta_6 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/spagettialpomodoro-1-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Спагетти аль Псомодоро</b>\nСпагетти, Псомодоро соус, пармезан, чеснок\n\nОдин размер 21сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = pasta_6[0].reply_markup.inline_keyboard[0][0].text;
  }
});
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.hears("Гарниры 🍟", async (ctx) => {
  {
    const garnish_1 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/fusili-2-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Хрустящие Цукини</b>\nХрустящие цукини во  фритюре с чесночным соусом\n\nОдин размер 23сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = garnish_1[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const garnish_2 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/zakuska4-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Хлебные палочки</b>\nМягкие хлебные палочки, оливковое масло, чеснок, пармезан.\n\nОдин размер 15сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = garnish_2[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const garnish_3 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/%D1%84%D1%80%D0%B8-%D1%81-%D0%BF%D0%B0%D1%80%D0%BC%D0%B5%D0%B7%D0%B0%D0%BD%D0%BE%D0%BC-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Картофель фри с пармезансом</b>\nКартофель, соль, пармезан\n\nОдин размер 18сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = garnish_3[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const garnish_4 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/%D1%84%D1%80%D0%B8-%D1%81-%D1%87%D0%B5%D1%81%D0%BD%D0%BE%D0%BA%D0%BE%D0%BC-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Картофель фри с чесноксом</b>\nКартофель, соль, чеснок\n\nОдин размер 16сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = garnish_4[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const garnish_5 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/%D1%84%D1%80%D0%B8.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Картофель фри</b>\nКартофель, соль\n\nОдин размер 16сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = garnish_5[0].reply_markup.inline_keyboard[0][0].text;
  }
});
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.hears("Салаты 🥗", async (ctx) => {
  {
    const salad_1 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2020/09/thai-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Тайский</b>\nАрахисовый соус, Китайская капуста, Морковь, Красный болгарский перец, Огурцы, Красная капуста, Лук, Кинза, Базилик, Арахис.\n\nОдин размер 32сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = salad_1[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const salad_2 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/%D0%B4%D0%B5%D0%BB%D0%BB%D0%B0-%D0%BA%D0%B0%D1%81%D0%B0-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Делла Каcа</b>\nЛистья Салата, Красный лук, оливки, Пармезан, Итальянский салатный соус, Бальзамический уксус, специи.\n\nОдин размер 32сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = salad_2[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const salad_3 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/%D0%BA%D0%B0%D0%BF%D1%80%D0%B5%D0%B7%D0%B5-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Капрезе</b>\nПсомидор, свежий сыр, Соус Пест, Грецкий орех, Бальзамический уксус, специи\n\nОдин размер 32сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = salad_3[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const salad_4 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/GREEK.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Греческий</b>\nЛистья Салата, Псомидоры, Огурцы, Болгарский перец, Фета Красный лук, оливки, Соус-заправка для Греческого\n\nОдин размер 37сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = salad_4[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const salad_5 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/04/salad5-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Цезарь c курицей</b>\nКурица, Листья Салата, Пармезан, Курутоны, Соус Цезарь\n\nОдин размер 32сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = salad_5[0].reply_markup.inline_keyboard[0][0].text;
  }
});
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.hears("Напитки 🥤", async (ctx) => {
  {
    const drink_1 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2021/06/%D1%81%D0%BE%D0%BA-%D0%B4%D0%BE%D0%B1%D1%80%D1%8B%D0%B902-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Сок Добрый</b>\nОбъем – 0.2 литра\n\nЦенa: 9сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_1[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_2 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2021/06/%D1%81%D0%BE%D0%BA-%D0%B4%D0%BE%D0%B1%D1%80%D1%8B%D0%B9.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Сок Добрый</b>\nОбъем – 1 литра\n\nЦенa: 25сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_2[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_3 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2021/06/%D0%B3%D0%BE%D1%80%D0%B8%D0%BB%D0%BB%D0%B0-%D1%8D%D0%BD%D0%B5%D1%80%D0%B3%D0%B5%D1%82%D0%B8%D0%BA-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Энергетик горилла</b>\nОбъем – 0.45 литра\n\nЦенa: 14сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_3[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_4 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/10/fusetea_lemon-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Fuse Tea Лимон</b>\nОбъем – 0,45 литра\n\nЦенa: 8сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_4[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_5 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/10/fusetea-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Fuse Tea Персик</b>\nОбъем – 0,45 литра\n\nЦенa: 8сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_5[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_6 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/10/bonaqua1-gaz-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>BonAqua газированный</b>\nОбъем — 1 литр\n\nЦенa: 7сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_6[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_7 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/10/bonaqua1-ne-gaz-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>BonAqua негазированный</b>\nОбъем — 1 литр\n\nЦенa: 7сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_7[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_8 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/sprite1lt-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Спрайт</b>\nОбъем – 1,5 литра\n\nЦенa: 14сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_8[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_9 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/10/fanta15-1-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Фанта</b>\nОбъем – 1,5 литра\n\nЦенa: 14сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_9[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_10 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/10/fanta15-1-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Кока-Кола</b>\nОбъем – 1,5 литра\n\nЦенa: 15сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_10[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_11 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/bonaqua15_gaz-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>BonAqua газированный</b>\nОбъем – 1,5 литра\n\nЦенa: 9сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_11[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_12 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/bonaqua05-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>BonAqua газированный</b>\nОбъем – 0,5 литра\n\nЦенa: 5сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_12[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_13 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/bonaqua15ne_gaz-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>BonAqua негазированный</b>\nОбъем – 1,5 литра\n\nЦенa: 9сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_13[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_14 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/bonaqua05ne_gaz-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>BonAqua негазированный</b>\nОбъем – 0,5 литра\n\nЦенa: 5сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_14[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_15 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/fanta1lt-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Фанта</b>\nОбъем – 1 литра\n\nЦенa: 11сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_15[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_16 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/sprite1lt-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Спрайт</b>\nОбъем – 1 литра\n\nЦенa: 11сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_16[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_17 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/cocacola1lt-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Кока-Кола</b>\nОбъем – 1 литра\n\nЦенa: 11сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_17[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_18 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/sprite05-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Спрайт</b>\nОбъем – 0,5 литра\n\nЦенa: 8сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_18[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_19 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/fanta05-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Фанта</b>\nОбъем – 0,5 литра\n\nЦенa: 8сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_19[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const drink_20 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2018/02/cocacola05-600x600.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Кока-Кола</b>\nОбъем – 0,5 литра\n\nЦенa: 8сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = drink_20[0].reply_markup.inline_keyboard[0][0].text;
  }
});
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.hears("Десерты 🍰", async (ctx) => {
  {
    const dessert_1 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2020/09/desert3-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Брауни с ванильным мороженым</b>\n\nЦенa: 20сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = dessert_1[0].reply_markup.inline_keyboard[0][0].text;
  }

  {
    const dessert_2 = [
      await ctx.replyWithPhoto(
        {
          url: "https://bellapizza.tj/wp-content/uploads/2019/10/desert1-300x300.jpg",
        },
        {
          parse_mode: "Markdown",
          parse_mode: "HTML",
          caption: `<b>Чизкейк</b>\n\nОдин размер 25сом`,
          ...Markup.inlineKeyboard([
            Markup.button.callback("Добавить в корзину 🛒", "btn_cart"),
          ]),
        }
      ),
    ];
    const btn_cart = dessert_2[0].reply_markup.inline_keyboard[0][0].text;
  }
});
/* 
--------------------------------------------------------------------------------------------------------------------------
*/

bot.action("btn_cart_pizza", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageCaption(
    "Выберите размер",
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Средний", "btn_size"),
        Markup.button.callback("Большой", "btn_size"),
      ],
      [Markup.button.callback("Супер семейный", "btn_size")],
    ])
  );
});
bot.action("btn_size", async (ctx) => {
  console.log(
    ctx.update.callback_query.message.reply_markup.inline_keyboard[0][0].text
  );
  // await ctx.editMessageCaption("Введите количество");
  // bot.on("message", (ctx) => {
  // return ctx.reply(ctx.message.text), ctx.reply("Текст принят");
  // });
});
bot.action("btn_cart_pizza", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageCaption("Выберите размер");
  await ctx.reply(
    `Выберите размер`,
    Markup.keyboard([
      [
        Markup.button.callback("Средний", "btn_size"),
        Markup.button.callback("Большой", "btn_size"),
      ],
      [Markup.button.callback("Супер семейный", "btn_size")],
    ])
      .resize()
      .oneTime()
  );
  await ctx.answerCbQuery();
  await ctx.editMessageCaption("Введите количество");
  bot.hears("Средний" || "Большой" || "Супер семейный", async (ctx) => {
    const size = ctx.match;
    await ctx.reply(`Вы выбрали ${size} размер. Теперь введите количество.`);
    bot.on("message", async (ctx) => {
      const count = ctx.message.text;
      await ctx.reply(`Вам нужно ${count} количество, размера ${size}.`);
    });
  });
  await ctx.answerCbQuery();
  await ctx.editMessageCaption("Добавлено в корзину ✅");
});
bot.action("btn_cart", async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageCaption("Введите количество");
  bot.on("message", async (ctx) => {
    const count = ctx.message.text;
    ctx.reply(`Вы ввели ${count}.`);
  });
});

bot.action("btn_cart_pizza", async (ctx) => {
  const btn_size_pizza = [
    await ctx.answerCbQuery(),
    await ctx.editMessageCaption("Выберите размер", {
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback("Средний", "btn_size"),
          Markup.button.callback("Большой", "btn_size"),
        ],
        [Markup.button.callback("Супер семейный", "btn_size")],
      ]),
    }),
  ];
  const btn_size_1 = btn_size_pizza[1].reply_markup.inline_keyboard[0][0].text;
  const btn_size_2 = btn_size_pizza[1].reply_markup.inline_keyboard[0][1].text;
  const btn_size_3 = btn_size_pizza[1].reply_markup.inline_keyboard[1][0].text;

  bot.action("btn_size", async (ctx) => {
    await ctx.answerCbQuery(),
      await ctx.editMessageCaption(``, {
        parse_mode: "Markdown",
        ...Markup.inlineKeyboard([
          [Markup.button.callback("Добавлено в корзину", "btn_finish")],
        ]),
      });
  });
});

/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.command("help", (ctx) => {
  ctx.reply(
    `Вы должно быть заблудились...\nВот все команды бота:\n/start Начать с начала\n/menu Просмотреть меню\n/cart Просмотреть корзину\n/help Просмотреть все комманды\n\nВыберите дальнейшее действие.`,
    Markup.keyboard([
      [
        {
          text: "Меню 📒",
        },
        {
          text: "Корзина 🛒",
        },
      ],
    ]).resize()
  );
});
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.launch();
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
/* 
--------------------------------------------------------------------------------------------------------------------------
*/
bot.on("message", async (ctx) => {
  const chat_id = -765565757;
  const text = ctx.message.text;
  ctx.state.user = {
    text: ctx.message.text,
    name: ctx.from.first_name,
    lastName: ctx.from.last_name,
  };
  if (text === "hell") {
    console.log(ctx.state.user);
  }
  if (text === "Hell") {
    console.log(ctx.state.user);
  }
});

const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const allVariables = require("./variables");
const bot = new Telegraf(process.env.BOT_TOKEN);

const chat_id = -765565757;

const user = {};

bot.on("message", async (ctx) => {
  const text = ctx.message.text;
  ctx.state.user = {
    text: ctx.message.text,
    name: ctx.from.first_name,
    lastName: ctx.from.last_name,
  };

  if (text === "/start") {
    await ctx.reply(
      `Здравствуйте ${await ctx.from
        .first_name}! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
      Markup.keyboard([
        Markup.button.text("Меню 📒"),
        Markup.button.text("Корзина 🛒"),
      ]).resize()
    );
  }
});

bot.start(async (ctx) => {
  await ctx.reply(
    `Здравствуйте ${await ctx.from
      .first_name}! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
    Markup.keyboard([
      Markup.button.text("Меню 📒"),
      Markup.button.text("Корзина 🛒"),
    ]).resize()
  );
});

bot.hears("На главную ⬅️", async (ctx) => {
  await ctx.reply(
    `Здравствуйте ${await ctx.from
      .first_name}! Добро пожаловать в бот доставки еды.\n\nВыберите дальнейшее действие.`,
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
      [Markup.button.text("Бургеры 🍔"), Markup.button.text("Паста 🍝")],
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
    "btn_cart_pizza"
  );
});
bot.action("btn_cart_pizza", async (ctx) => {
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
    user["size"] = ctx.message.text;
    await ctx.reply("Теперь введите количество.");
    bot.on("message", async (ctx) => {
      user["count"] = ctx.message.text;
      await ctx.reply(`done`);
      return ctx.reply(`${user}`);
      // return ctx.telegram.sendMessage(chat_id, user);
    });
  });
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
