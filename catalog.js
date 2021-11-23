const catalog = [
  {
    id: "pizza1",
    category: "Пицца 🍕",
    url: "https://bellapizza.tj/wp-content/uploads/2020/12/shaurmapizza-300x300.jpg",
    name: "Шаурма пицца",
    description: `*Шаурма пицца* \nБелла Соус, Моцарелла, Пепперони, Пеперончини \n\nСредняя 72сом \nБольшая 85сом \nСупер семейная 116сом
`,
    size: {
      size1: "Средняя",
      size2: "Большая",
      size3: "Супер семейная",
    },
    price: {
      price1: 72,
      price2: 85,
      price3: 116,
    },
  },
  {
    id: "Burger1",
    category: "Бургеры 🍔",
    url: "https://bellapizza.tj/wp-content/uploads/2020/09/steakburger-300x300.jpg",
    name: "Стейк Сэндвич",
    description: `*Стейк Сэндвич*\nКусочки говядины, грибы, лук, болгарский перец, чесночный соус\n\nОдин размер 47сом`,
    price: 47,
  },
];

module.exports.catalog = catalog;
