const rescue = require('express-rescue');
const SalesService = require('../services/salesService');

const getAll = rescue(async (_req, res) => {
  const sales = await SalesService.getAll();
  return res.status(200).json(sales);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.getById(Number(id));
  if (sale === undefined || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
});

module.exports = {
  getAll,
  getById,
};