const validateProducts = require('../schemas/validateProducts');

const validProducts = (req, res, next) => {
  const { error } = validateProducts.validate(req.body);
  if (error && error.message.includes('is required')) {
    return res.status(400).json({ message: error.message });
  }
  if (error && error.message.includes('must be')) {
    return res.status(422).json({ message: error.message });
  }
  next();
};

module.exports = validProducts;