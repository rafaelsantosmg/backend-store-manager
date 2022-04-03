const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await SalesModel.getById(id);
  return sale;
};

const create = async (sales) => {
  const [product] = await ProductsModel.getById(sales[0].productId);
  if (product.quantity <= sales[0].quantity) return [];
  product.quantity -= sales[0].quantity;
  await ProductsModel.update(product);
  const createSale = SalesModel.create(sales);
  return createSale;
};

const update = async ({ id, productId, quantity }) => {
  const sale = SalesModel.update({ id, productId, quantity });
  return sale;
};

const destroyer = async ({ id }) => {
  const findSaleId = await SalesModel.getFindId(id);
  if (findSaleId !== undefined && findSaleId.length === 0) return [];
  const sales = await SalesModel.getById(id);
  sales.forEach(async (sale) => {
    const [product] = await ProductsModel.getById(sale.productId);
    product.quantity += sale.quantity;
    await ProductsModel.update(product);
  });
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