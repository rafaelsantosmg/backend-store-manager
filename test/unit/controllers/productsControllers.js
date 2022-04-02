const { expect } = require('chai');
const sinon = require('sinon');
const ProductsController = require('../../../controllers/productsController');
const ProductsService = require('../../../services/productsService');
const mocks = require('../helpers/mocks');

describe('Testa os controllers da rota /Products', () => {
  const res = {};
  const req = {};

  describe('Testa a função getAll', () => {
    before(() => {
      sinon.stub(ProductsService, 'getAll').resolves(mocks.allProducts)
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
    });

    after (() => {
      ProductsService.getAll.restore();
    });

    it('valida resposta HTTP status 200', async () => {
      await ProductsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('valida se retorna todos os produtos', async () => {
      await ProductsController.getAll(req, res);
      expect(res.json.calledWith(mocks.allProducts)).to.be.equal(true);
    });
  });

  describe('Testa a função getById', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição getById', () => {
      before(() => {
        sinon.stub(ProductsService, 'getById').resolves(mocks.getProductById);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.params = sinon.stub().returns({ id: 1 })
      });
  
      after(() => {
        ProductsService.getById.restore();
      });
  
      it('valida resposta HTTP status 200', async () => {
        await ProductsController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('valida se traz o retorno do produto pelo id', async () => {
        await ProductsController.getById(req, res);
        expect(res.json.calledWith(mocks.getProductById)).to.be.equal(true);
      });
    });
  
    describe('Testa se houve rejeição na requisição getById', () => {
      const error = { status: 404, message: 'Product not found' };
      before(() => {
        sinon.stub(ProductsService, 'getById').resolves([]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.params = sinon.stub().returns({ id: 8 });
      });
  
      after(() => {
        ProductsService.getById.restore();
      });
  
      it('valida resposta HTTP status 404', async () => {
        await ProductsController.getById(req, res);
        expect(res.status.calledWith(error.status)).to.be.equal(true);
      });
  
      it('valida se teve a resposta correta da mensagem de erro', async () => {
        await ProductsController.getById(req, res);
        expect(res.json.calledWith({ message: error.message })).to.be.equal(true);
      });
    });
  });

  describe('Testa a função create', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição create', () => {
      before(() => {
        sinon.stub(ProductsService, 'create').resolves([1]);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.body = mocks.createProduct;
      });
  
      after(() => {
        ProductsService.create.restore();
      });
  
      it('valida resposta HTTP status 201', async () => {
        await ProductsController.create(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });
      it('valida se traz o retorno do produto criado', async () => {
        await ProductsController.create(req, res);
        expect(res.json.calledWith(mocks.createProductSucess)).to.be.equal(true);
      });
    });
  
    describe('Testa se houve rejeição na requisição create', () => {
      const error = { status: 409, message: 'Product already exists' };
      before(() => {
        sinon.stub(ProductsService, 'create').resolves([]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      });
  
      after(() => {
        ProductsService.create.restore();
      });
  
      it('valida resposta HTTP status 409', async () => {
        await ProductsController.create(req, res);
        expect(res.status.calledWith(error.status)).to.be.equal(true);
      });
  
      it('valida se teve a resposta correta da mensagem de erro', async () => {
        await ProductsController.create(req, res);
        expect(res.json.calledWith({ message: error.message })).to.be.equal(true);
      });
    });
  });

  describe('Testa a função update', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição update', () => {
      before(() => {
        sinon.stub(ProductsService, 'update').resolves([mocks.updateProduct]);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.params = sinon.stub().returns({ id: 2 });
        req.body = mocks.updateProductReq;
      });
  
      after(() => {
        ProductsService.update.restore();
      });
  
      it('valida resposta HTTP status 200', async () => {
        await ProductsController.update(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('valida se traz o retorno do produto criado', async () => {
        await ProductsController.update(req, res);
        expect(res.json.calledWith(mocks.updateProduct)).to.be.equal(true);
      });
    });
  
    describe('Testa se houve rejeição na requisição update', () => {
      const error = { status: 404, message: 'Product not found' };
      before(() => {
        sinon.stub(ProductsService, 'update').resolves([]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      });
  
      after(() => {
        ProductsService.update.restore();
      });
  
      it('valida resposta HTTP status 404', async () => {
        await ProductsController.update(req, res);
        expect(res.status.calledWith(error.status)).to.be.equal(true);
      });
  
      it('valida se teve a resposta correta da mensagem de erro', async () => {
        await ProductsController.update(req, res);
        expect(res.json.calledWith({ message: error.message })).to.be.equal(true);
      });
    });
  });

  describe('Testa a função delete', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição delete', () => {
      before(() => {
        sinon.stub(ProductsService, 'destroyer').resolves(mocks.deleteProducts);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        res.end = sinon.stub().returns(res);
        req.params = sinon.stub().returns({ id: 1 });
      });
  
      after(() => {
        ProductsService.destroyer.restore();
      });
  
      it('valida resposta HTTP status 204', async () => {
        await ProductsController.destroyer(req, res);
        expect(res.status.calledWith(204)).to.be.equal(true);
      });
    });
  
    describe('Testa se houve rejeição na requisição delete', () => {
      const error = { status: 404, message: 'Product not found' };
      before(() => {
        sinon.stub(ProductsService, 'destroyer').resolves([]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      });
  
      after(() => {
        ProductsService.destroyer.restore();
      });
  
      it('valida resposta HTTP status 404', async () => {
        await ProductsController.destroyer(req, res);
        expect(res.status.calledWith(error.status)).to.be.equal(true);
      });
  
      it('valida se teve a resposta correta da mensagem de erro', async () => {
        await ProductsController.destroyer(req, res);
        expect(res.json.calledWith({ message: error.message })).to.be.equal(true);
      });
    });
  });
});