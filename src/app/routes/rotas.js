const express = require('express')
const rotas = express.Router()
const controle = require('../controllers/controlador')

rotas.get('/', controle.paginaPrincipal)

module.exports = rotas