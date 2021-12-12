const { Markup } = require('telegraf')

const chat_id = -765565757

const commands = `
/start Начать с начала
/menu Просмотреть меню
/cart Просмотреть корзину
/help Просмотреть все комманды
`

const mainKeyboard = Markup.keyboard([
  Markup.button.text('Меню 📒')
])
  .oneTime()
  .resize()

const cartKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('Перейти к корзине 🛒', 'cartBtn')
])

const orderKeyBoard = Markup.inlineKeyboard([
  [Markup.button.callback('Оформить заказ 📋', 'makeOrder')],
  [Markup.button.callback('Очистить корзину ♻️', 'cleanCart')]
])

const menuKeyboard = Markup.keyboard([
  [Markup.button.text('Пицца 🍕')],
  [Markup.button.text('Бургеры 🍔'), Markup.button.text('Паста 🍝')],
  [Markup.button.text('Гарниры 🍟'), Markup.button.text('Салаты 🥗')],
  [Markup.button.text('Напитки 🥤'), Markup.button.text('Дессерты 🍰')],
  [Markup.button.text('На главную ⬅️')]
])
  .resize()
  .oneTime()

const sizeKeyboard = Markup.keyboard([
  [Markup.button.text('Средний'), Markup.button.text('Большой')],
  [Markup.button.text('Семейный')],
  [Markup.button.text('На главную ⬅️')]
])
  .oneTime()
  .resize()

const contactKeyboard = Markup.keyboard([
  [Markup.button.contactRequest('Оставить контакты 📞')]
])
  .resize()
  .oneTime()

const catalog = [
  {
    category: 'Пицца 🍕',
    url: 'https://bellapizza.tj/wp-content/uploads/2020/12/shaurmapizza-300x300.jpg',
    name: 'Шаурма пицца',
    description: '*Шаурма пицца* \nБелла Соус, Моцарелла, Пепперони, Пеперончини \n\nСредний 50 сомон \nБольшой 70 сомон \nCемейный 90 сомон',
    price: {price1: 50, price2: 70, price3: 90}
  },
  {
    category: 'Пицца 🍕',
    url: 'https://bellapizza.tj/wp-content/uploads/2020/09/%D0%BF%D0%B8%D0%BA%D0%B0%D0%BD%D1%82%D0%B0-300x300.jpg',
    name: 'Пиканта',
    description: '*Пиканта* \nБелла Соус, Моцарелла, Пепперони, Пеперончини \n\nСредний 45 сомон \nБольшой 65 сомон \nCемейный 85 сомон',
    price: {price1: 45, price2: 65, price3: 85}
  },
  {
    category: 'Пицца 🍕',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/12/%D0%BA%D0%B0%D1%80%D1%80%D0%B8-%D1%81-%D0%BA%D1%83%D1%80%D0%B8%D1%86%D0%B5%D0%B9-300x300.jpg',
    name: 'Карри с курицей',
    description: '*Карри с курицей* \nСоус Карри, Моцарелла, запечённая курица, П сомонидоры, Болгарский перец, кинза, грибы \n\nСредний 55 сомон \nБольшой 75 сомон \nCемейный 95 сомон',
    price: {price1: 55, price2: 75, price3: 95}
  },
  {
    category: 'Пицца 🍕',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/12/%D0%BA%D0%B0%D1%80%D1%80%D0%B8-%D0%B2%D0%B5%D0%B3%D0%B5%D1%82%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F-300x300.jpg',
    name: 'Карри вегетарианская',
    description: '*Карри вегетарианская* \nСоус Карри, Моцарелла, Свежий сыр, П сомонидоры, Болгарский перец,  Грибы, Кинза \n\nСредний 60 сомон \nБольшой 70 сомон \nCемейный 90 сомон',
    price: {price1: 60, price2: 70, price3: 90}
  },
  {
    category: 'Пицца 🍕',
    url: 'https://bellapizza.tj/wp-content/uploads/2018/10/%D0%BC%D0%B0%D1%80%D0%B8%D0%BD%D0%B0%D1%80%D0%B0-%D1%81-%D1%84%D0%B0%D1%80%D1%88%D0%B5%D0%BC-300x300.jpg',
    name: 'Маринара с Фаршем',
    description: '*Маринара с Фаршем* \nМаринара Соус, Моцарелла, кусочки мяса из говяжьего фарша, грибы, оливки, базилик и Пармезан \n\nСредний 50 сомон \nБольшой 60 сомон \nCемейный 70 сомон',
    price: {price1: 50, price2: 60, price3: 70}
  },
  {
    category: 'Бургеры 🍔',
    url: 'https://bellapizza.tj/wp-content/uploads/2020/09/steakburger-300x300.jpg',
    name: 'Стейк Сэндвич',
    description: '*Стейк Сэндвич* \nБелла Соус, Моцарелла, Пепперони, Пеперончини \n\nСредний 30 сомон \nБольшой 40 сомон \nCемейный 50 сомон',
    price: {price1: 30, price2: 40, price3: 50}
  },
  {
    category: 'Бургеры 🍔',
    url: 'bellapizza.tj/wp-content/uploads/2020/09/clubsendvich-300x300.jpg',
    name: 'Клаб Сэндвич',
    description: '*Клаб Сэндвич* \nЗапеченное куриное филе, сыр, п сомонидор, лист салата, соленый огурец, чесночный соус \n\nСредний 35 сомон \nБольшой 40 сомон \nCемейный 55 сомон',
    price: {price1: 35, price2: 40, price3: 55}
  },
  {
    category: 'Бургеры 🍔',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/10/chickenburger-600x600.jpg',
    name: 'Куриный бургер',
    description: '*Куриный бургер* \nБулочка, куриная котлета, п сомонидор, соленый огурец, лук, лист салата, соус \n\nСредний 30 сомон \nБольшой 35 сомон \nCемейный 40 сомон',
    price: {price1: 30, price2: 35, price3: 40}
  },
  {
    category: 'Бургеры 🍔',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/bigbella-600x600.jpg',
    name: 'Биг Белла',
    description: '*Биг Белла* \nБулочка, две говяжьи котлеты, сыр, п сомонидор, соленый огурец, лук, лист салата, соус Биг Белла \n\nСредний 35 сомон \nБольшой 45 сомон \nCемейный 50 сомон',
    price: {price1: 45, price2: 35, price3: 50}
  },
  {
    category: 'Бургеры 🍔',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/newyorkburger-600x600.jpg',
    name: 'Нью-Йорк Бургер',
    description: '*Нью-Йорк Бургер* \nБулочка, говяжья котлета, сыр, грибы, гриль-лук, горчичный соус \n\nСредний 30 сомон \nБольшой 45 сомон \nCемейный 50 сомон',
    price: {price1: 30, price2: 45, price3: 50}
  },
  {
    category: 'Паста 🍝',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/pennearabiata-1-300x300.jpg',
    name: 'Пенне Арабиатта',
    description: '*Пенне Арабиатта* \nПенне, Аррабиата соус, Пармезан, Чеснок \n\nСредний 30 сомон \nБольшой 40 сомон \nCемейный 50 сомон',
    price: {price1: 30, price2: 40, price3: 50}
  },
  {
    category: 'Паста 🍝',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/fusili-2-300x300.jpg',
    name: 'Фусили в Сливочно-грибн сомон соусе',
    description: '*Фусили в Сливочно-грибн сомон соусе* \nФусили, Альфредо соус, грибы, пармезан, чеснок \n\nСредний 25 сомон \nБольшой 30 сомон \nCемейный 35 сомон',
    price: {price1: 25, price2: 30, price3: 35}
  },
  {
    category: 'Паста 🍝',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/mcheese-1-600x600.jpg',
    name: 'Мак-н-чиз',
    description: '*Мак-н-чиз* \nМакароны, Альфредо соус, чедер, гауда, пармезан, чеснок \n\nСредний 25 сомон \nБольшой 30 сомон \nCемейный 35 сомон',
    price: {price1: 25, price2: 30, price3: 35}
  },
  {
    category: 'Паста 🍝',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/fetuchini-1-600x600.jpg',
    name: 'Фетучини Альфредо с Курицей',
    description: '*Фетучини Альфредо с Курицей* \nФетучини, Альфредо соус, запечённая курица, пармезан, чеснок \n\nСредний 30 сомон \nБольшой 40 сомон \nCемейный 50 сомон',
    price: {price1: 30, price2: 40, price3: 50}
  },
  {
    category: 'Паста 🍝',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/pennebolonezza-1-600x600.jpg',
    name: 'Пенне Болоньезе',
    description: '*Пенне Болоньезе* \nПенне, Мясной Болоньезе соус, пармезан, чеснок \n\nСредний 20 сомон \nБольшой 25 сомон \nCемейный 30 сомон',
    price: {price1: 20, price2: 25, price3: 30}
  },
  {
    category: 'Гарниры 🍟',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/fusili-2-300x300.jpg',
    name: 'Хрустящие Цукини',
    description: '*Хрустящие Цукини* \nХрустящие цукини во  фритюре с чесночным соу сомон \n\nСредний 20 сомон \nБольшой 30 сомон \nCемейный 40 сомон ',
    price: {price1: 20, price2: 30, price3: 40}
  },
  {
    category: 'Гарниры 🍟',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/zakuska4-300x300.jpg',
    name: 'Хлебные палочки',
    description: '*Хлебные палочки* \nМягкие хлебные палочки, оливковое масло, чеснок, пармезан \n\nСредний 25 сомон \nБольшой 35 сомон \nCемейный 40 сомон ',
    price: {price1: 25, price2: 35, price3: 40}
  },
  {
    category: 'Гарниры 🍟',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/%D1%84%D1%80%D0%B8-%D1%81-%D0%BF%D0%B0%D1%80%D0%BC%D0%B5%D0%B7%D0%B0%D0%BD%D0%BE%D0%BC-600x600.jpg',
    name: 'Картофель фри с пармезан сомон',
    description: '*Картофель фри с пармезан сомон* \nКартофель, соль, пармезан \n\nСредний 25 сомон \nБольшой 35 сомон \nCемейный 40 сомон ',
    price: {price1: 25, price2: 35, price3: 40}
  },
  {
    category: 'Гарниры 🍟',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/%D1%84%D1%80%D0%B8-%D1%81-%D1%87%D0%B5%D1%81%D0%BD%D0%BE%D0%BA%D0%BE%D0%BC-600x600.jpg',
    name: 'Картофель фри с чеснок сомон',
    description: '*Картофель фри с чеснок сомон* \nКартофель, соль, чеснок \n\nСредний 25 сомон \nБольшой 35 сомон \nCемейный 40 сомон ',
    price: {price1: 25, price2: 35, price3: 40}
  },
  {
    category: 'Гарниры 🍟',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/%D1%84%D1%80%D0%B8.jpg',
    name: 'Картофель фри',
    description: '*Картофель фри* \nКартофель, соль \n\nСредний 20 сомон \nБольшой 30 сомон \nCемейный 35 сомон ',
    price: {price1: 20, price2: 30, price3: 35}
  },
  {
    category: 'Салаты 🥗',
    url: 'https://bellapizza.tj/wp-content/uploads/2020/09/thai-300x300.jpg',
    name: 'Тайский',
    description: '*Тайский* \nАрахисовый соус, Китайская капуста, Морковь, Красный болгарский перец, Огурцы, Красная капуста, Лук, Кинза, Базилик, Арахис \n\nСредний 20 сомон \nБольшой 30 сомон \nCемейный 40 сомон ',
    price: {price1: 20, price2: 30, price3: 40}
  },
  {
    category: 'Салаты 🥗',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/%D0%B4%D0%B5%D0%BB%D0%BB%D0%B0-%D0%BA%D0%B0%D1%81%D0%B0-300x300.jpg',
    name: 'Делла Каcа',
    description: '*Делла Каcа* \nЛистья Салата, Красный лук, оливки, Пармезан, Итальянский салатный соус, Бальзамический уксус, специи \n\nСредний 15 сомон \nБольшой 20 сомон \nCемейный 25 сомон ',
    price: {price1: 15, price2: 20, price3: 25}
  },
  {
    category: 'Салаты 🥗',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/%D0%BA%D0%B0%D0%BF%D1%80%D0%B5%D0%B7%D0%B5-600x600.jpg',
    name: 'Капрезе',
    description: '*Капрезе* \nП сомонидор, свежий сыр, Соус Пест, Грецкий орех, Бальзамический уксус, специи \n\nСредний 15 сомон \nБольшой 20 сомон \nCемейный 25 сомон ',
    price: {price1: 15, price2: 20, price3: 25}
  },
  {
    category: 'Салаты 🥗',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/GREEK.jpg',
    name: 'Греческий',
    description: '*Греческий* \nЛистья Салата, П сомонидоры, Огурцы, Болгарский перец, Фета Красный лук, оливки, Соус-заправка для Греческого \n\nСредний 15 сомон \nБольшой 20 сомон \nCемейный 25 сомон ',
    price: {price1: 15, price2: 20, price3: 25}
  },
  {
    category: 'Салаты 🥗',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/04/salad5-600x600.jpg',
    name: 'Цезарь c курицей',
    description: '*Цезарь c курицей* \nКурица, Листья Салата, Пармезан, Курутоны, Соус Цезарь \n\nСредний 20 сомон \nБольшой 25 сомон \nCемейный 30 сомон ',
    price: {price1: 20, price2: 25, price3: 30}
  },
  {
    category: 'Напитки 🥤',
    url: 'https://bellapizza.tj/wp-content/uploads/2021/06/%D1%81%D0%BE%D0%BA-%D0%B4%D0%BE%D0%B1%D1%80%D1%8B%D0%B902-300x300.jpg',
    name: 'Cок Добрый',
    description: '*Cок Добрый* \n\nСредний (0.5л) 10 сомон \nБольшой (1л) 20 сомон \nCемейный (1.5л) 30 сомон ',
    price: {price1: 10, price2: 20, price3: 30}
  },
  {
    category: 'Напитки 🥤',
    url: 'https://bellapizza.tj/wp-content/uploads/2018/02/sprite1lt-600x600.jpg',
    name: 'Спрайт',
    description: '*Спрайт* \n\nСредний (0.5л) 5 сомон \nБольшой (1л) 10 сомон \nCемейный (1.5л) 15 сомон ',
    price: {price1: 5, price2: 10, price3: 15}
  },
  {
    category: 'Напитки 🥤',
    url: 'https://bellapizza.tj/wp-content/uploads/2018/10/fanta15-1-600x600.jpg',
    name: 'Фанта',
    description: '*Фанта* \n\nСредний (0.5л) 5 сомон \nБольшой (1л) 10 сомон \nCемейный (1.5л) 15 сомон ',
    price: {price1: 5, price2: 10, price3: 15}
  },
  {
    category: 'Напитки 🥤',
    url: 'https://bellapizza.tj/wp-content/uploads/2018/02/cocacola1lt-600x600.jpg',
    name: 'Кока-Кола',
    description: '*Кока-Кола* \n\nСредний (0.5л) 5 сомон \nБольшой (1л) 10 сомон \nCемейный (1.5л) 15 сомон ',
    price: {price1: 5, price2: 10, price3: 15}
  },
  {
    category: 'Напитки 🥤',
    url: 'https://bellapizza.tj/wp-content/uploads/2018/02/bonaqua15_gaz-600x600.jpg',
    name: 'BonAqua газированный',
    description: '*BonAqua газированный* \n\nСредний (0.5л) 3 сомон \nБольшой (1л) 5 сомон \nCемейный (1.5л) 7 сомон ',
    price: {price1: 3, price2: 5, price3: 7},
  },
  {
    category: 'Напитки 🥤',
    url: 'https://bellapizza.tj/wp-content/uploads/2018/02/bonaqua15ne_gaz-600x600.jpg',
    name: 'BonAqua негазированный',
    description: '*BonAqua негазированный* \n\nСредний (0.5л) 3 сомон \nБольшой (1л) 5 сомон \nCемейный (1.5л) 7 сомон ',
    price: {price1: 3, price2: 5, price3: 7},
  },
  {
    category: 'Дессерты 🍰',
    url: 'https://bellapizza.tj/wp-content/uploads/2020/09/desert3-300x300.jpg',
    name: 'Брауни с ванильным мороженым',
    description: '*Брауни с ванильным мороженым* \n\nСредний 30 сомон \nБольшой 40 сомон \nCемейный 50 сомон ',
    price: {price1: 30, price2: 40, price3: 50}
  },
  {
    category: 'Дессерты 🍰',
    url: 'https://bellapizza.tj/wp-content/uploads/2019/10/desert1-300x300.jpg',
    name: 'Чизкейк',
    description: '*Чизкейк* \n\nСредний 25 сомон \nБольшой 30 сомон \nCемейный 40 сомон ',
    price: {price1: 25, price2: 30, price3: 40}
  },
]


module.exports.commands = commands
module.exports.chat_id = chat_id
module.exports.mainKeyboard = mainKeyboard
module.exports.cartKeyboard = cartKeyboard
module.exports.orderKeyBoard = orderKeyBoard
module.exports.menuKeyboard = menuKeyboard
module.exports.sizeKeyboard = sizeKeyboard
module.exports.contactKeyboard = contactKeyboard
module.exports.catalog = catalog
