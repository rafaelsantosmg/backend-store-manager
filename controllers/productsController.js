const ProductsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await ProductsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsService.getById(Number(id));
  if (product === undefined || product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsService.create({ name, quantity });
  if (product !== undefined && product.length === 0) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  return res.status(201).json({ id: product[0], name, quantity });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await ProductsService.update({ name, quantity, id: Number(id) });
  if (product !== undefined && product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product[0]);
};

const destroyer = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsService.destroyer({ id: Number(id) });
  if (product !== undefined && product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroyer,
};