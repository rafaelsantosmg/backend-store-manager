const connection = require('./connection');

const getFindName = async (name) => {
  const [productName] = await connection.execute(`
  SELECT name FROM products
  WHERE name = ?`,
  [name]);
  return productName;
};

const getFindId = async (id) => {
  const [productId] = await connection.execute(`
  SELECT id FROM products
  WHERE id = ?`,
  [id]);
  return productId;
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
  return product;
};

const create = async ({ name, quantity }) => {
  const [product] = await connection.execute(`
  INSERT INTO products (name, quantity)
  VALUES (?, ?)`,
  [name, quantity]);
  return product;
};

const update = async ({ name, quantity, id }) => {
  await connection.execute(`
  UPDATE products
  SET name = ?, quantity = ?
  WHERE id = ?`,
  [name, quantity, id]);
  return id;
};

const destroyer = async ({ id }) => {
  const [product] = await connection.execute(`
  DELETE FROM products
  WHERE id = ?`,
  [id]);
  return product;
};

module.exports = {
  getFindName,
  getFindId,
  getAll,
  getById,
  create,
  update,
  destroyer,
};
