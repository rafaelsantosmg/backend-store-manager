const allProducts = [
  {
    name: "Martelo de Thor",
    quantity: 10,
  },
  {
    name: "Traje de encolhimento",
    quantity: 20,
  },
  {
    name: "Escudo do Capitão América",
    quantity: 30,
  }
];

const createProduct = {
  name: "Martelo de Thor",
  quantity: 10,
}

const updateProduct = {
  id: 1,
  name: "Armadura do Homem de Ferro",
  quantity: 5,
}

const deleteProducts = [
  {
    name: "Traje de encolhimento",
    quantity: 20,
  },
  {
    name: "Escudo do Capitão América",
    quantity: 30,
  }
]

module.exports = {
  allProducts,
  createProduct,
  updateProduct,
  deleteProducts,
}