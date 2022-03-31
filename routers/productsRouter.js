const router = require('express').Router();
const { getAll,
  getById,
  create,
  update } = require('../controllers/productsController');
const validProducts = require('../middlewares/validateProductMiddleware');

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', validProducts, create);

router.put('/:id', validProducts, update);

module.exports = router;