const ProductsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return products;
};

const getById = async (id) => {
  const [product] = await ProductsModel.getById(id);
  return product;
};

const create = async ({ name, quantity }) => {
  const [findProduct] = await ProductsModel.getFindName(name);
  if (findProduct) return [];
  const { insertId } = await ProductsModel.create({ name, quantity });
  return [insertId];
};

const update = async ({ name, quantity, id }) => {
  const findProductId = await ProductsModel.getFindId(id);
  if (!findProductId) return [];
  await ProductsModel.update({ name, quantity, id });
  return [{ id, name, quantity }];
};

const destroyer = async ({ id }) => {
  const findProductId = await ProductsModel.getFindId(id);
  if (!findProductId) return [];
  await ProductsModel.destroyer({ id });
  return id;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroyer,
};