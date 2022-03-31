const connection = require('./connection');

const getFind = async (name) => {
  const [product] = await connection.execute(`
  SELECT name FROM products
  WHERE name = ?`,
  [name]);
  return product;
};

const getAll = async () => {
  const [products] = await connection.execute(`
  SELECT * FROM products
  ORDER BY id`);
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(`
  SELECT * FROM products
  WHERE id = ?`,
  [id]);
  return product[0];
};

const create = async ({ name, quantity }) => {
  const [product] = await connection.execute(`
  INSERT INTO products (name, quantity)
  VALUES (?, ?)`,
  [name, quantity]);
  return product;
};

module.exports = {
  getFind,
  getAll,
  getById,
  create,
};
