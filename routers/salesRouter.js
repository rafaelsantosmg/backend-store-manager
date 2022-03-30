const router = require('express').Router();
const { getAll, getById } = require('../controllers/salesControllers');

router.get('/', getAll);

router.get('/:id', getById);

module.exports = router;