const catalog = [
  {
    id: "pizzaz1",
    category: "Пицца 🍕",
    url: "https://bellapizza.tj/wp-content/uploads/2020/12/shaurmapizza-300x300.jpg",
    name: "Шаурма пицца",
    description: `*Шаурма пицца* \nБелла Соус, Моцарелла, Пепперони, Пеперончини \n\nСредний 50сом \nБольшой 70сом \nCемейный 90сом`,
    price: { price1: 50, price2: 70, price3: 90 },
  },
  {
    id: "burger1",
    category: "Бургеры 🍔",
    url: "https://bellapizza.tj/wp-content/uploads/2020/09/steakburger-300x300.jpg",
    name: "Стейк Сэндвич",
    description: `*Стейк Сэндвич* \nБелла Соус, Моцарелла, Пепперони, Пеперончини \n\nСредний 30сом \nБольшой 40сом \nCемейный 50сом`,
    price: { price1: 30, price2: 40, price3: 50 },
  },
  {
    id: "pasta1",
    category: "Паста 🍝",
    url: "https://bellapizza.tj/wp-content/uploads/2019/04/pennearabiata-1-300x300.jpg",
    name: "Пенне Арабиатта",
    description: `*Пенне Арабиатта* \nПенне, Аррабиата соус, Пармезан, Чеснок \n\nСредний 30сом \nБольшой 40сом \nCемейный 50сом`,
    price: { price1: 30, price2: 40, price3: 50 },
  },
  {
    id: "garnish1",
    category: "Гарниры 🍟",
    url: "https://bellapizza.tj/wp-content/uploads/2019/04/fusili-2-300x300.jpg",
    name: "Хрустящие Цукини",
    description: `*Хрустящие Цукини* \nХрустящие цукини во  фритюре с чесночным соусом \n\nСредний 20сом \nБольшой 30сом \nCемейный 40сом `,
    price: { price1: 20, price2: 30, price3: 40 },
  },
  {
    id: "salad1",
    category: "Салаты 🥗",
    url: "https://bellapizza.tj/wp-content/uploads/2020/09/thai-300x300.jpg",
    name: "Тайский",
    description: `*Тайский* \nАрахисовый соус, Китайская капуста, Морковь, Красный болгарский перец, Огурцы, Красная капуста, Лук, Кинза, Базилик, Арахис \n\nСредний 20сом \nБольшой 30сом \nCемейный 40сом `,
    price: { price1: 20, price2: 30, price3: 40 },
  },
  {
    id: "drink1",
    category: "Напитки 🥤",
    url: "https://bellapizza.tj/wp-content/uploads/2021/06/%D1%81%D0%BE%D0%BA-%D0%B4%D0%BE%D0%B1%D1%80%D1%8B%D0%B902-300x300.jpg",
    name: "Cок Добрый",
    description: `*Cок Добрый* \n\nСредний (0.5л) 10сом \nБольшой (1л) 20сом \nCемейный (1.5л) 30сом `,
    price: { price1: 10, price2: 20, price3: 30 },
  },
  {
    id: "dessert1",
    category: "Дессерты 🍰",
    url: "https://bellapizza.tj/wp-content/uploads/2020/09/desert3-300x300.jpg",
    name: "Брауни с ванильным мороженым",
    description: `*Брауни с ванильным мороженым* \n\nСредний 30сом \nБольшой 40сом \nCемейный 50сом `,
    price: { price1: 30, price2: 40, price3: 50 },
  },
];

module.exports.catalog = catalog;