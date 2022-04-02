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

  describe('Testa a função getById', () => {
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
      it('valida se traz o retorno da venda pelo id', async () => {
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

  describe('Testa se houve sucesso na requisição create', () => {
    before(() => {
      sinon.stub(SalesService, 'create').resolves(mocks.sale);
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
    it('valida se traz o retorno da venda criada', async () => {
      await SalesController.create(req, res);
      expect(res.json.calledWith(mocks.sale)).to.be.equal(true);
    });
  });

  describe('Testa se houve sucesso na requisição update', () => {
    before(() => {
      sinon.stub(SalesService, 'update').resolves(mocks.salesDBUpdate);
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res)
      req.params = sinon.stub().returns({ id: 1 });
      req.body = mocks.updateSaleReq;
    });

    after(() => {
      SalesService.update.restore();
    });

    it('valida resposta HTTP status 200', async () => {
      await SalesController.update(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('valida se traz o retorno da venda é atualizada', async () => {
      await SalesController.update(req, res);
      expect(res.json.calledWith(mocks.salesDBUpdate)).to.be.equal(true);
    });
  });

  describe('Testa a função delete', () => {
    const res = {};
    const req = {};

    describe('Testa se houve sucesso na requisição delete', () => {
      before(() => {
        sinon.stub(SalesService, 'destroyer').resolves(mocks.deleteSale);
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
      const error = { status: 404, message: 'Sale not found' };
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