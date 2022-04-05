const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');
const errorsMiddleware = require('../middlewares/errorsMiddleware');

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await SalesModel.getById(id);
  if (!sale || sale.length === 0) throw errorsMiddleware(404, 'Sale not found');
  return sale;
};

const create = async (sales) => {
  await Promise.all(sales.map(async (sale) => {
    const [product] = await ProductsModel.getById(sale.productId);
    if (product.quantity < sale.quantity) {
      throw errorsMiddleware(422, 'Such amount is not permitted to sell');
    }
    product.quantity -= sale.quantity;
    await ProductsModel.update(product);
  }));
  const createSale = await SalesModel.create(sales);
  return createSale;
};

const update = async (id, sales) => {
  const findSaleId = await SalesModel.getFindId(id);
  if (!findSaleId) throw errorsMiddleware(404, 'Sale not found');
  const itemUpdated = await Promise.all(sales.map(async (sale) => {
    await SalesModel.update(id, sale.productId, sale.quantity);
    return { productId: sale.productId, quantity: sale.quantity };
  }));
  return {
    saleId: id,
    itemUpdated,
  };
};

const destroyer = async (id) => {
  const [findSale] = await SalesModel.getFindId(id);
  if (!findSale || !findSale.saleId) {
    throw errorsMiddleware(404, 'Sale not found');
  }
  const sales = await SalesModel.getById(id);
  await Promise.all(sales.map(async (sale) => {
    const [product] = await ProductsModel.getById(sale.productId);
    product.quantity += sale.quantity;
    await ProductsModel.update(product);
  }));
  await SalesModel.destroyer(id);
  return id;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroyer,
};