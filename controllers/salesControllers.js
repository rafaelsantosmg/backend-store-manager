const SalesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await SalesService.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SalesService.getById(Number(id));
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(404).json({ message: error.message }); 
  }
};

const create = async (req, res) => {
  try {
    const sale = await SalesService.create(req.body);
    return res.status(201).json(sale);
  } catch (error) {
    return res.status(422).json({ message: error.message }); 
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SalesService
      .update(Number(id), req.body);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const destroyer = async (req, res) => {
  try {
    const { id } = req.params;
    await SalesService.destroyer(Number(id));
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