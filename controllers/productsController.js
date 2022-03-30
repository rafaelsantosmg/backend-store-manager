const rescue = require('express-rescue');
const ProductsService = require('../services/productsService');

const getAll = rescue(async (_req, res) => {
  const products = await ProductsService.getAll();
  return res.status(200).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ProductsService.getById(Number(id));
  if (product === undefined || product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
});

module.exports = {
  getAll,
  getById,
};