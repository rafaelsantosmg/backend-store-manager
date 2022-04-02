const SalesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await SalesModel.getById(id);
  return sale;
};

const create = async (sales) => {
  const sale = SalesModel.create(sales);
  return sale;
};

const update = async ({ id, productId, quantity }) => {
  const sale = SalesModel.update({ id, productId, quantity });
  return sale;
};

const destroyer = async ({ id }) => {
  const findSaleId = await SalesModel.getFindId(id);
  if (findSaleId !== undefined && findSaleId.length === 0) return [];
  await SalesModel.destroyer({ id });
  return id;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroyer,
};