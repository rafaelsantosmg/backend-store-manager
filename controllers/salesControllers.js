const SalesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await SalesService.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.getById(Number(id));
  return res.status(200).json(sale);
};

const create = async (req, res) => {
  const sale = await SalesService.create(req.body);
  return res.status(201).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService
    .update(Number(id), req.body);
  return res.status(200).json(sale);
};

const destroyer = async (req, res) => {
  const { id } = req.params;
  await SalesService.destroyer(Number(id));
  return res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroyer,
};