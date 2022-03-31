const connection = require('./connection');

const serialize = (data) => (
  {
    saleId: data.sale_id,
    date: data.date,
    productId: data.product_id,
    quantity: data.quantity,
  });

const getAll = async () => {
  const [sales] = await connection.execute(`
  SELECT sp.sale_id, s.date, sp.product_id, sp.quantity FROM StoreManager.sales s
  INNER JOIN StoreManager.sales_products sp
  ON s.id = sp.sale_id
  ORDER BY sp.sale_id, s.id;
  `);
  return sales.map(serialize);
};

const getById = async (id) => {
  const [sale] = await connection.execute(`
  SELECT s.date, sp.product_id, sp.quantity FROM StoreManager.sales s
  INNER JOIN StoreManager.sales_products sp
  ON s.id = sp.sale_id
  WHERE s.id = ?
  ORDER BY sp.sale_id, sp.product_id;
  `,
  [id]);
  return sale.map(serialize);
};

module.exports = {
  getAll,
  getById,
};
