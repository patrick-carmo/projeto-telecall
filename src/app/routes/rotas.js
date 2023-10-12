const express = require('express')
const rotas = express.Router()
const controle = require('../controllers/controlador')
const verificarAutenticacao = require('../middleware/intermediario')
const usuario = require('../controllers/usuario')
const perfilUsuario = require('../controllers/perfil')

rotas.get('/login', controle.login)
rotas.post('/cadastrar', usuario.cadastrar)
rotas.post('/autenticar', controle.autenticar)


rotas.use(verificarAutenticacao)
rotas.get('/', controle.index)

rotas.get('/perfil', perfilUsuario)
rotas.post('/alterar', usuario.alterar)


rotas.get('/logout', controle.logout)

module.exports = rotas