const express = require('express');
const productsRouter = require('./routers/productsRouter');
const salesRouter = require('./routers/salesRouter');
const handleError = require('./middlewares/handleError');
require('dotenv').config();

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use(handleError);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
