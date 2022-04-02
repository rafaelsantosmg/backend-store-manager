const { expect } = require("chai");
const sinon = require('sinon');
const salesService = require("../../../services/salesService");
const salesModel = require('../../../models/salesModel');
const mocks = require('../helpers/mocks');

describe('Service - Rota "/products"', () => {
  describe('Valida a função create', () => {
    describe('Valida se produto é criado!', () => {
      before(() => {
        sinon.stub(salesModel, 'create').resolves(mocks.sale);
      })
    
      after(() => {
        salesModel.create.restore();
      })
    
      it('Valida se cria o produto', async () => {
        const result = await salesService.create(mocks.createSale);
        expect(result).to.deep.equal(mocks.sale);
      });
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
    
      it('Valida o retorno dos produtos', async () => {
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
    describe('Valida se produto é atualizado!', () => {
      before(() => {
        sinon.stub(salesModel, 'update').resolves(mocks.salesDBUpdate);
      })
    
      after(() => {
        salesModel.update.restore();
      })
    
      it('Valida se atualiza o produto', async () => {
        const result = await salesService.update(mocks.updateSale);
        expect(result).to.deep.equal(mocks.salesDBUpdate);
      });
    });
  });

  describe('Valida a função delete', () => {
    describe('Valida se existe um produto com mesmo id', () => {
      before(() => {
        sinon.stub(salesModel, 'destroyer').resolves(mocks.deleteSale);
        sinon.stub(salesModel, 'getFindId').resolves(mocks.deleteSale);
      })
    
      after(() => {
        salesModel.destroyer.restore();
        salesModel.getFindId.restore();
      })
    
      it('Valida se id ja existe', async () => {
        const id = await salesService.destroyer({ id: 1 });
        expect(id).to.deep.equal(mocks.deleteProducts);
      });
    });
    describe('Valida se produto é deletado!', () => {
      before(() => {
        sinon.stub(salesModel, 'destroyer').resolves(mocks.deleteProducts);
        sinon.stub(salesModel, 'getFindId').resolves(mocks.deleteSale);
      })
    
      after(() => {
        salesModel.destroyer.restore();
        salesModel.getFindId.restore();
      })
    
      it('Valida se deleta o produto', async () => {
        const id = await salesService.destroyer({ id: 1 });
        expect(id).to.deep.equal(mocks.deleteSale);
      });
    });
  });
});