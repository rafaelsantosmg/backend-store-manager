// const { expect } = require("chai");
// const sinon = require('sinon');
// const ProductsService = require('../../../services/productsService');
// const ProductsController = require('../../../controllers/');

// const fakeName = "café";
// const fakeId = 1
// const fakeServiceSuccess = { id: fakeId, name: fakeName }
// describe('Controller - Rota "/trem"', () => {
//   let fakeRes;
//   let fakeReq;
//   before(() => {
//     fakeReq = { body: { name: fakeName } };
//     fakeRes = {};
//     fakeRes.status = sinon.stub().returns(fakeRes);
//     fakeRes.json = sinon.spy();
//   })
//   describe('Sucesso', () => {
//     before(() => {
//       sinon.stub(ProductsService, 'create')'../../../services/productsService'ccess);
//     });
//     after(() => {
//       ProductsService.create'../../../services/productsService''quando recebido um body válido, status deve ser chamado com 201', async () => {
//       await ProductsController.create(fakeReq, fakeRes);

//       expect(fakeRes.status.calledWith(201)).to.be.true;
//     });
//     it('quando recebido um body válido, json deve ser chamado com resultado do Service', async () => {
//       await ProductsController.create(fakeReq, fakeRes);

//       expect(fakeRes.json.calledWith(fakeServiceSuccess)).to.be.true;
//     });
//   });


//   describe('Falha', () => {
//     before(async () => {
//       sinon.stub(ProductsService, 'create')'../../../services/productsService'
//       await ProductsController.create(fakeReq, fakeRes);
//     });
//     after(() => {
//       ProductsService.create'../../../services/productsService''Falha: quando recebido um body inválido, status deve ser chamado com 400', async () => {
//       expect(fakeRes.status.calledWith(400)).to.be.true;

//     });
//     it('Falha: quando recebido um body inválido, json deve ser chamado com um objeto com chave message igual a "Esse trem não tem cabimento"', async () => {
//       expect(fakeRes.json.calledWith({ message: "esse trem não tem cabimento" })).to.be.true;
//     });
//   });

// });