const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel')
const mocks = require('../helpers/mocks');

describe("Products Model", () => {
  describe("Inserir um produto na tabela products", () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    });
    after(() => {
      connection.execute.restore();
    });
    it("Valida se produto foi inserido", async () => {
      const { insertId } = await ProductsModel.create(mocks.createProduct);
      expect(insertId).to.be.equal(1);
    });
  });
  
  describe('Retornar todo os produtos', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.allProducts]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida se todos os produtos estão sendo retornados', async () => {
      const products = await ProductsModel.getAll();
      expect(products).to.be.equal(mocks.allProducts);
    });
  });

  describe('Atualiza um produtos', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.updateProduct]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida se todos os produtos estão sendo retornados', async () => {
      const id = await ProductsModel.update(mocks.updateProduct);
      expect(id).to.be.equal(1);
    });
  });

  describe('Deleta um produtos', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.deleteProducts]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida se produto foi deletado corretamente', async () => {
      const id = await ProductsModel.destroyer({ id: 1 });
      expect(id).to.be.equal(1);
    });
  });

  describe('Busca um produto por id', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.findProductId]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida se produto foi deletado corretamente', async () => {
      const result = await ProductsModel.getFindId(1);
      expect(result).to.deep.equal(mocks.findProductId);
    });
  });

  describe('Busca um produto por name', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.findProductName]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida se produto foi deletado corretamente', async () => {
      const result = await ProductsModel.getFindName('Armadura do Homem de Ferro');
      expect(result).to.deep.equal(mocks.findProductName);
    });
  });

  describe('Busca um produto por id e exibe todas as colunas', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([mocks.getProductById]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Valida se produto foi deletado corretamente', async () => {
      const result = await ProductsModel.getById(1);
      expect(result).to.deep.equal(mocks.getProductById);
    });
  });
});
