const Joi = require('joi');

const handleError = (err, _req, res, _next) => {
  if (Joi.isError(err)) return res.status(400).json({ message: err.message });
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: 'Ops algo deu errado!' });
};

module.exports = handleError;