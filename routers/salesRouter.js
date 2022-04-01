const rescue = require('express-rescue');
const router = require('express').Router();
const { getAll,
  getById,
  create,
  update,
  destroyer } = require('../controllers/salesControllers');
const validateSales = require('../middlewares/validateSaleMiddleware');

router.get('/', rescue(getAll));

router.get('/:id', rescue(getById));

router.post('/', validateSales, rescue(create));

router.put('/:id', validateSales, rescue(update));

router.delete('/:id', rescue(destroyer));

module.exports = router;