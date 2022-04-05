const { expect } = require("chai");
const sinon = require('sinon');
const salesService = require("../../../services/salesService");
const salesModel = require('../../../models/salesModel');
const ProductsModel = require('../../../models/productsModel');
const mocks = require('../helpers/mocks');

describe('Service - Rota "/sales"', () => {
  describe('Valida a função create', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves([mocks.getProductById]);
      sinon.stub(ProductsModel, 'update').resolves();
      sinon.stub(salesModel, 'create').resolves(mocks.sale);
    })
  
    after(() => {
      ProductsModel.getById.restore();
      ProductsModel.update.restore();
      salesModel.create.restore();
    })

    it('Valida se cria a venda', async () => {
      const result = await salesService.create(mocks.createSale);
      expect(result).to.deep.equal(mocks.sale);
    });
  });

  describe('Valida a funçôes get', () => {
    describe('Valida a função getAll', () => {
      before(() => {
        sinon.stub(salesModel, 'getAll').resolves(mocks.sales);
      })
    
      after(() => {
        salesModel.getAll.restore();
      })
    
      it('Valida o retorno ddas vendas', async () => {
        const result = await salesService.getAll();
        expect(result).to.deep.equal(mocks.sales);
      });
    });
    describe('Valida a função getById!', () => {
      before(() => {
        sinon.stub(salesModel, 'getById').resolves(mocks.getFindById);
      })
    
      after(() => {
        salesModel.getById.restore();
      })
    
      it('Valida se retorna o produto pelo id', async () => {
        const result = await salesService.getById(1);
        expect(result).to.deep.equal(mocks.getFindById);
      });
    });
  });

  describe('Valida a função update', () => {
    const { id, sales } = mocks.updateSale;
    before(() => {
      sinon.stub(salesModel, 'getFindId').resolves(1)
      sinon.stub(salesModel, 'update').resolves();
    })
  
    after(() => {
      salesModel.getFindId.restore();
      salesModel.update.restore();
    })
  
    it('Valida se atualiza o produto', async () => {
      const result = await salesService.update(id, sales);
      expect(result).to.deep.equal(mocks.salesDBUpdate);
    });
  });

  describe('Valida se produto é deletado!', () => {
    before(() => {
      sinon.stub(salesModel, 'getFindId').resolves(1);
      sinon.stub(salesModel, 'getById').resolves(mocks.getFindById);
      sinon.stub(ProductsModel, 'getById').resolves([mocks.getProductById]);
      sinon.stub(ProductsModel, 'update').resolves(mocks.updateProduct);
      sinon.stub(salesModel, 'destroyer').resolves();
    })
  
    after(() => {
      salesModel.destroyer.restore();
      salesModel.getFindId.restore();
      salesModel.getById.restore();
      ProductsModel.getById.restore();
      ProductsModel.update.restore();
    })
  
    it('Valida se deleta o produto', async () => {
      const result = await salesModel.destroyer(1);
      expect(result).to.deep.equal(undefined);
    });
  });
});