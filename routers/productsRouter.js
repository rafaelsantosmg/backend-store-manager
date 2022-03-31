const router = require('express').Router();
const rescue = require('express-rescue');

const { getAll,
  getById,
  create,
  update } = require('../controllers/productsController');
const validProducts = require('../middlewares/validateProductMiddleware');

router.get('/', rescue(getAll));

router.get('/:id', rescue(getById));

router.post('/', validProducts, rescue(create));

router.put('/:id', rescue(validProducts, update));

module.exports = router;