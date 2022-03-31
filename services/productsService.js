const ProductsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await ProductsModel.getById(id);
  return product;
};

const create = async ({ name, quantity }) => {
  const [findProduct] = await ProductsModel.getFind(name);
  console.log(findProduct);
  if (findProduct !== undefined && findProduct.name === name) return [];
  const { insertId } = await ProductsModel.create({ name, quantity });
  return [insertId];
};

module.exports = {
  getAll,
  getById,
  create,
};