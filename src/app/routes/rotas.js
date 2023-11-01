import express from 'express'
import controle from '../controllers/controlador.js'
import verificarAutenticacao from '../middleware/verificarAutenticacao.js'
import verificarDados from '../middleware/verificarDados.js'
import usuario from '../controllers/usuario.js'
import perfilUsuario from '../controllers/perfil.js'
import schemaUsuario from '../models/schemaUsuario.js'

const rotas = express.Router()

rotas.get('/login', controle.login)
rotas.post('/cadastrar', verificarDados(schemaUsuario), usuario.cadastrar)
rotas.post('/autenticar', controle.autenticar)

rotas.use(verificarAutenticacao)
rotas.get('/', controle.index)
rotas.get('/internet', controle.internet)
rotas.get('/telefonia', controle.telefonia)
rotas.get('/rede-e-infraestrutura', controle.redeInfraestrutura)

rotas.get('/perfil', perfilUsuario)
rotas.post('/alterar', verificarDados(schemaUsuario), usuario.alterar)

rotas.get('/logout', controle.logout)

export default rotas
