const { expect } = require('chai');
const sinon = require('sinon')

const connection = require('../../../models/connection')

const ProductsModel = {
  create: () => {}
};

describe('Insere um novo produto no BD', () => {
  const payloadProduct = {
    id: 4,
    name: 'Armadura Homem de ferro',
    quantity: 2,
  };

  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await ProductsModel.create(payloadProduct);

      expect(response).to.be.a('object')
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await ProductsModel.create(payloadProduct);

      expect(response).to.have.a.property('id')
    });

  });
});