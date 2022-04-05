const ProductsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await ProductsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductsService.getById(Number(id));
  return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const id = await ProductsService.create(name, quantity);
  return res.status(201).json({ id, name, quantity });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await ProductsService
    .update(name, quantity, Number(id));
  return res.status(200).json(product[0]);
};

const destroyer = async (req, res) => {
  const { id } = req.params;
  await ProductsService.destroyer(Number(id));
  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroyer,
};