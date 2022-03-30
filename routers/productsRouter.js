const router = require('express').Router();
const { getAll, getById } = require('../controllers/productsController');

router.get('/', getAll);

router.get('/:id', getById);

module.exports = router;