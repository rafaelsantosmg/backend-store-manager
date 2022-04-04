const ProductsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await ProductsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.getById(Number(id));
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const id = await ProductsService.create(name, quantity);
    return res.status(201).json({ id, name, quantity });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await ProductsService
      .update(name, quantity, Number(id));
    return res.status(200).json(product[0]);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const destroyer = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductsService.destroyer(Number(id));
    return res.status(204).end();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroyer,
};