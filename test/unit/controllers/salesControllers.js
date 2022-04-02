const { expect } = require('chai');
const sinon = require('sinon');
const SalesController = require('../../../controllers/salesControllers');
const SalesService = require('../../../services/salesService');
const mocks = require('../helpers/mocks');

describe('Testa os controllers da rota /Sales', () => {
  const res = {};
  const req = {};

  describe('Testa a função getAll', () => {
    before(() => {
      sinon.stub(SalesService, 'getAll').resolves(mocks.sales)
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
    });

    after (() => {
      SalesService.getAll.restore();
    });

    it('valida resposta HTTP status 200', async () => {
      await SalesController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('valida se retorna todas as vendas', async () => {
      await SalesController.getAll(req, res);
      expect(res.json.calledWith(mocks.sales)).to.be.equal(true);
    });
  });

  describe.only('Testa a função getById', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição getById', () => {
      before(() => {
        sinon.stub(SalesService, 'getById').resolves(mocks.sale);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.params = sinon.stub().returns({ id: 1 })
      });
  
      after(() => {
        SalesService.getById.restore();
      });
  
      it('valida resposta HTTP status 200', async () => {
        await SalesController.getById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('valida se traz o retorno do produto pelo id', async () => {
        await SalesController.getById(req, res);
        expect(res.json.calledWith(mocks.sale)).to.be.equal(true);
      });
    });
  
    describe('Testa se houve rejeição na requisição getById', () => {
      const error = { status: 404, message: 'Sale not found' };
      before(() => {
        sinon.stub(SalesService, 'getById').resolves([]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        req.params = sinon.stub().returns({ id: 8 });
      });
  
      after(() => {
        SalesService.getById.restore();
      });
  
      it('valida resposta HTTP status 404', async () => {
        await SalesController.getById(req, res);
        expect(res.status.calledWith(error.status)).to.be.equal(true);
      });
  
      it('valida se teve a resposta correta da mensagem de erro', async () => {
        await SalesController.getById(req, res);
        expect(res.json.calledWith({ message: error.message })).to.be.equal(true);
      });
    });
  });

  describe('Testa a função create', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição create', () => {
      before(() => {
        sinon.stub(SalesService, 'create').resolves([1]);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.body = mocks.createProduct;
      });
  
      after(() => {
        SalesService.create.restore();
      });
  
      it('valida resposta HTTP status 201', async () => {
        await SalesController.create(req, res);
        expect(res.status.calledWith(201)).to.be.equal(true);
      });
      it('valida se traz o retorno do produto criado', async () => {
        await SalesController.create(req, res);
        expect(res.json.calledWith(mocks.createProductSucess)).to.be.equal(true);
      });
    });
  
    describe('Testa se houve rejeição na requisição create', () => {
      const error = { status: 409, message: 'Product already exists' };
      before(() => {
        sinon.stub(SalesService, 'create').resolves([]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      });
  
      after(() => {
        SalesService.create.restore();
      });
  
      it('valida resposta HTTP status 409', async () => {
        await SalesController.create(req, res);
        expect(res.status.calledWith(error.status)).to.be.equal(true);
      });
  
      it('valida se teve a resposta correta da mensagem de erro', async () => {
        await SalesController.create(req, res);
        expect(res.json.calledWith({ message: error.message })).to.be.equal(true);
      });
    });
  });

  describe('Testa a função update', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição update', () => {
      before(() => {
        sinon.stub(SalesService, 'update').resolves([mocks.updateProduct]);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        req.params = sinon.stub().returns({ id: 2 });
        req.body = mocks.updateProductReq;
      });
  
      after(() => {
        SalesService.update.restore();
      });
  
      it('valida resposta HTTP status 200', async () => {
        await SalesController.update(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });
      it('valida se traz o retorno do produto criado', async () => {
        await SalesController.update(req, res);
        expect(res.json.calledWith(mocks.updateProduct)).to.be.equal(true);
      });
    });
  
    describe('Testa se houve rejeição na requisição update', () => {
      const error = { status: 404, message: 'Product not found' };
      before(() => {
        sinon.stub(SalesService, 'update').resolves([]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      });
  
      after(() => {
        SalesService.update.restore();
      });
  
      it('valida resposta HTTP status 404', async () => {
        await SalesController.update(req, res);
        expect(res.status.calledWith(error.status)).to.be.equal(true);
      });
  
      it('valida se teve a resposta correta da mensagem de erro', async () => {
        await SalesController.update(req, res);
        expect(res.json.calledWith({ message: error.message })).to.be.equal(true);
      });
    });
  });

  describe('Testa a função delete', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição delete', () => {
      before(() => {
        sinon.stub(SalesService, 'destroyer').resolves(mocks.deleteProducts);
        res.status = sinon.stub().returns(res)
        res.json = sinon.stub().returns(res)
        res.end = sinon.stub().returns(res);
        req.params = sinon.stub().returns({ id: 1 });
      });
  
      after(() => {
        SalesService.destroyer.restore();
      });
  
      it('valida resposta HTTP status 204', async () => {
        await SalesController.destroyer(req, res);
        expect(res.status.calledWith(204)).to.be.equal(true);
      });
    });
  
    describe('Testa se houve rejeição na requisição delete', () => {
      const error = { status: 404, message: 'Product not found' };
      before(() => {
        sinon.stub(SalesService, 'destroyer').resolves([]);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      });
  
      after(() => {
        SalesService.destroyer.restore();
      });
  
      it('valida resposta HTTP status 404', async () => {
        await SalesController.destroyer(req, res);
        expect(res.status.calledWith(error.status)).to.be.equal(true);
      });
  
      it('valida se teve a resposta correta da mensagem de erro', async () => {
        await SalesController.destroyer(req, res);
        expect(res.json.calledWith({ message: error.message })).to.be.equal(true);
      });
    });
  });
});