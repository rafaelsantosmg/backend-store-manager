const SalesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await SalesService.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.getById(Number(id));
  if (sale === undefined || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
};

const create = async (req, res) => {
  const sale = await SalesService.create(req.body);
  return res.status(201).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  const sale = await SalesService
    .update({ id: Number(id), productId, quantity });
  return res.status(200).json(sale);
};

const destroyer = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.destroyer({ id: Number(id) });
  if (sale !== undefined && sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
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