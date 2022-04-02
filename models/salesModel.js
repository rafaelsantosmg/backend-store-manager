const connection = require('./connection');

const serialize = (data) => (
  {
    saleId: data.sale_id,
    date: data.date,
    productId: data.product_id,
    quantity: data.quantity,
  });

const serializeById = (data) => (
  {
    date: data.date,
    productId: data.product_id,
    quantity: data.quantity,
  });

const getFindId = async (id) => {
  const [saleId] = await connection.execute(`
  SELECT id FROM sales
  WHERE id = ?`,
    [id]);
  await connection.execute(`
  SELECT sale_id FROM sales_products
  WHERE sale_id = ?`,
  [id]);
  return saleId;
};

const getAll = async () => {
  const [sales] = await connection.execute(`
  SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
  FROM StoreManager.sales s
  INNER JOIN sales_products sp
  ON s.id = sp.sale_id
  ORDER BY sp.sale_id, s.id;
  `);
  return sales.map(serialize);
};

const getById = async (id) => {
  const [sale] = await connection.execute(`
  SELECT s.date, sp.product_id, sp.quantity FROM StoreManager.sales s
  INNER JOIN sales_products sp
  ON s.id = sp.sale_id
  WHERE s.id = ?
  ORDER BY sp.sale_id, sp.product_id;
  `,
    [id]);
  return sale.map(serializeById);
};

const create = async (sales) => {
  const itemsSold = [];
  const [{ insertId }] = await connection.execute(`
  INSERT INTO sales (date) VALUES (NOW())`);
  await sales.forEach(({ productId, quantity }) => {
    itemsSold.push({ productId, quantity });
    connection.execute(`
      INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [insertId, productId, quantity]);
  });
  return {
    id: insertId,
    itemsSold,
  };
};

const update = async ({ id, productId, quantity }) => {
  await connection.execute(`
  UPDATE sales SET date = NOW()
  WHERE id = ?`,
  [id]);
  await connection.execute(`
  UPDATE sales_products
  SET product_id = ?, quantity = ?
  WHERE sale_id = ?`,
  [productId, quantity, id]);
  return {
    saleId: id,
    itemUpdated: [{ productId, quantity }],
  };
};

const destroyer = async ({ id }) => {
  await connection.execute(`
  DELETE FROM sales_products
  WHERE sale_id = ?`,
  [id]);
  await connection.execute(`
  DELETE FROM sales
  WHERE id = ?`,
  [id]);
  return id;
};

module.exports = {
  getFindId,
  getAll,
  getById,
  create,
  update,
  destroyer,
};
