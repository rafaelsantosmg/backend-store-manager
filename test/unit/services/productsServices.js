const { expect } = require("chai");
const sinon = require('sinon');
const ProductsService = require("../../../services/productsService");
const ProductsModel = require('../../../models/productsModel');
const mocks = require('../helpers/mocks');

describe('Service - Rota "/products"', () => {
  describe('Valida a função create', () => {
    describe('Valida se existe um produto com mesmo nome', () => {
      before(() => {
        sinon.stub(ProductsModel, 'create').resolves(mocks.createProduct);
        sinon.stub(ProductsModel, 'getFindName').resolves([mocks.createProduct.name]);
      })
    
      after(() => {
        ProductsModel.create.restore();
        ProductsModel.getFindName.restore();
      })
    
      it('Valida se nome ja existe', async () => {
        const result = await ProductsService.create(mocks.createProduct);
        expect(result).to.be.deep.equal([]);
      });
    });
    describe('Valida se produto é criado!', () => {
      before(() => {
        sinon.stub(ProductsModel, 'create').resolves({insertId: 1});
        sinon.stub(ProductsModel, 'getFindName').resolves([]);
      })
    
      after(() => {
        ProductsModel.create.restore();
        ProductsModel.getFindName.restore();
      })
    
      it('Valida se cria o produto', async () => {
        const [id] = await ProductsService.create(mocks.createProduct);
        expect(id).to.be.equal(1);
      });
    });
  });

  describe('Valida a funçôes get', () => {
    describe('Valida a função getAll', () => {
      before(() => {
        sinon.stub(ProductsModel, 'getAll').resolves(mocks.allProducts);
      })
    
      after(() => {
        ProductsModel.getAll.restore();
      })
    
      it('Valida o retorno dos produtos', async () => {
        const result = await ProductsService.getAll();
        expect(result).to.deep.equal(mocks.allProducts);
      });
    });
    describe('Valida a função getById!', () => {
      before(() => {
        sinon.stub(ProductsModel, 'getById').resolves([mocks.findProductId]);
      })
    
      after(() => {
        ProductsModel.getById.restore();
      })
    
      it('Valida se retorna o produto pelo id', async () => {
        const result = await ProductsService.getById(1);
        expect(result).to.deep.equal(mocks.findProductId);
      });
    });
  });

  describe('Valida a função update', () => {
    describe('Valida se existe um produto com mesmo id', () => {
      before(() => {
        sinon.stub(ProductsModel, 'update').resolves({insertId: 2});
        sinon.stub(ProductsModel, 'getFindId').resolves(mocks.updateProduct.id);
      })
    
      after(() => {
        ProductsModel.update.restore();
        ProductsModel.getFindId.restore();
      })
    
      it('Valida se id ja existe', async () => {
        const [{ id }] = await ProductsService.update(mocks.updateProduct);
        expect(id).to.deep.equal(2);
      });
    });
    describe('Valida se produto é atualizado!', () => {
      before(() => {
        sinon.stub(ProductsModel, 'update').resolves({insertId: 1});
        sinon.stub(ProductsModel, 'getFindId').resolves(1);
      })
    
      after(() => {
        ProductsModel.update.restore();
        ProductsModel.getFindId.restore();
      })
    
      it('Valida se atualiza o produto', async () => {
        const [result] = await ProductsService.update(mocks.updateProduct);
        expect(result).to.deep.equal(mocks.updateProduct);
      });
    });
  });

  describe('Valida a função delete', () => {
    describe('Valida se existe um produto com mesmo id', () => {
      before(() => {
        sinon.stub(ProductsModel, 'destroyer').resolves(mocks.deleteProducts);
        sinon.stub(ProductsModel, 'getFindId').resolves(1);
      })
    
      after(() => {
        ProductsModel.destroyer.restore();
        ProductsModel.getFindId.restore();
      })
    
      it('Valida se id ja existe', async () => {
        const id = await ProductsService.destroyer({ id: 1 });
        expect(id).to.deep.equal(mocks.deleteProducts);
      });
    });
    describe('Valida se produto é deletado!', () => {
      before(() => {
        sinon.stub(ProductsModel, 'destroyer').resolves(mocks.deleteProducts);
        sinon.stub(ProductsModel, 'getFindId').resolves(1);
      })
    
      after(() => {
        ProductsModel.destroyer.restore();
        ProductsModel.getFindId.restore();
      })
    
      it('Valida se deleta o produto', async () => {
        const id = await ProductsService.destroyer({ id: 1 });
        expect(id).to.deep.equal(mocks.deleteProducts);
      });
    });
  });
});