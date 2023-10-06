const express = require('express')
const rotas = express.Router()
const controle = require('../controllers/controlador')
const verificarAutenticacao = require('../middleware/intermediario')
const dados = require('../controllers/cadastrar')

rotas.get('/login', controle.login)
rotas.post('/cadastrar', dados.cadastrar)
rotas.post('/autenticar', controle.autenticar)


rotas.use(verificarAutenticacao)
rotas.get('/', controle.index)


rotas.get('/logout', controle.logout)

module.exports = rotas