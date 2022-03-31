const router = require('express').Router();
const { getAll,
  getById,
  create,
  update } = require('../controllers/salesControllers');
const validateSales = require('../middlewares/validateSaleMiddleware');

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', validateSales, create);

router.put('/:id', validateSales, update);

module.exports = router;