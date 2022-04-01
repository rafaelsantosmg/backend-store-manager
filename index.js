const express = require('express');
require('dotenv').config();
const productsRouter = require('./routers/productsRouter');
const salesRouter = require('./routers/salesRouter');
const handleError = require('./middlewares/handleError');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
