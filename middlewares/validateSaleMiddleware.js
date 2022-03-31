const validateSales = require('../schemas/validateSales');

const validSales = (req, res, next) => {
  const { error } = validateSales.validate(req.body[0]);
  if (error && error.message.includes('is required')) {
    return res.status(400).json({ message: error.message });
  }
  if (error && error.message.includes('must be')) {
    return res.status(422).json({ message: error.message });
  }
  next();
};

module.exports = validSales;