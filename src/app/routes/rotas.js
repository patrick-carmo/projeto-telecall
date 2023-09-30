const express = require('express')
const rotas = express.Router()
const controle = require('../controllers/controlador')
const intermediario = require('../middleware/intermediario')
const dados = require('../controllers/cadastrar')

rotas.get('/login.html', controle.login)
rotas.post('/cadastrar', dados.cadastrar)

rotas.get('/', intermediario.verificarAutenticacao, controle.index)

rotas.get('/obter_erro', controle.erro)
rotas.get('/limpar_erro', controle.limparErro)
rotas.get('/nome', controle.nome)

rotas.post('/autenticar', controle.autenticar)
rotas.get('/logout', controle.logout)

module.exports = rotas