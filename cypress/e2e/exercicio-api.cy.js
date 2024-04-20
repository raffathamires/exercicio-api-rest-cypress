/// <reference types="cypress" />
import contrato from "../contratos/usuarios.contrato"

describe('Testes da Funcionalidade Usuários', () => {
    let nomeUsuario = 'EBAC Teste' + Math.floor(Math.random() * 100000000)
    let emailUsuario = 'fulano' + Math.floor(Math.random() * 100000000) + '@qa.com'
    let nomeUsuarioEditado = 'EBAC Teste' + Math.floor(Math.random() * 100000)
    let emailUsuarioEditado = 'fulano' + Math.floor(Math.random() * 100000000) + '@qa.com'
    let emailUsuarioDeletado = 'fulano' + Math.floor(Math.random() * 100000000) + '@qa.com'

    it('Deve validar contrato de usuários', () => {
        cy.request('usuarios').then(response => {
            return contrato.validateAsync(response.body)
          })
    });
  
    it('Deve listar usuários cadastrados - GET', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios'
          }).should((response) => {
            expect(response.body).to.have.property('usuarios')
            expect(response.status).to.equal(200)
          })
    });
  
    it('Deve cadastrar um usuário com sucesso - POST', () => {
        cy.cadastrarUsuario(nomeUsuario,emailUsuario, 'teste', 'true').should((response) => {
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            expect(response.status).to.equal(201)
          })
    });
  
    it('Deve validar um usuário com email inválido - POST', () => {
        cy.cadastrarUsuario(nomeUsuario,emailUsuario, 'teste', 'true').should((response) => {
            expect(response.body.message).to.equal('Este email já está sendo usado')
            expect(response.status).to.equal(400)
          })
    });
  
    it('Deve editar um usuário previamente cadastrado - PUT', () => {
        cy.cadastrarUsuario(nomeUsuarioEditado,emailUsuarioEditado, 'teste123', 'true')
        .then(response => {
          let id = response.body._id
          cy.request({
            method: 'PUT',
            url: `usuarios/${id}`,
            body:
            {
              "nome": "EBAC Teste" + Math.floor(Math.random() * 100000),
              "email": emailUsuarioEditado,
              "password": "testes456",
              "administrador": "true"
            }
          }).should((response) => {
            expect(response.body.message).to.equal('Registro alterado com sucesso')
            expect(response.status).to.equal(200)
          })
        })
    });
  
    it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
        cy.cadastrarUsuario('Teste Delete',emailUsuarioDeletado, 'teste123', 'true')
        .then(response => {
          let id = response.body._id
          cy.request({
            method: 'DELETE',
            url: `usuarios/${id}`,
          }).should((response) => {
            expect(response.body.message).to.equal('Registro excluído com sucesso')
            expect(response.status).to.equal(200)
          })
        })
    });
  
  
  });