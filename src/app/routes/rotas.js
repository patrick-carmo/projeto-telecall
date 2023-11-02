import express from 'express'
import controle from '../controllers/controladorRotas.js'
import { autenticar, logout} from '../controllers/autenticacao.js'

import verificarAutenticacao from '../middleware/verificarAutenticacao.js'
import validarDadosRequisicao from '../middleware/verificarRequisicao.js'
import { cadastrar, alterar } from '../controllers/usuario.js'
import obterPerfilUsuario from '../controllers/obterPerfil.js'
import schemaUsuario from '../models/schemaUsuario.js'

const rotas = express.Router()

rotas.get('/login', controle.login)
rotas.post('/cadastrar', validarDadosRequisicao(schemaUsuario), cadastrar)
rotas.post('/autenticar', autenticar)

rotas.use(verificarAutenticacao)

rotas.get('/', controle.index)
rotas.get('/internet', controle.internet)
rotas.get('/telefonia', controle.telefonia)
rotas.get('/rede-e-infraestrutura', controle.redeInfraestrutura)

rotas.get('/perfil', obterPerfilUsuario)
rotas.post('/alterar', validarDadosRequisicao(schemaUsuario), alterar)

rotas.get('/logout', logout)

export default rotas
