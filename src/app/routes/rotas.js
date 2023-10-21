// Importar os módulos usando o import
import express from 'express'
import controle from '../controllers/controlador.js'
import verificarAutenticacao from '../middleware/intermediario.js'
import usuario from '../controllers/usuario.js'
import perfilUsuario from '../controllers/perfil.js'

// Criar o objeto de rotas
const rotas = express.Router()

// Definir as rotas
rotas.get('/login', controle.login)
rotas.post('/cadastrar', usuario.cadastrar)
rotas.post('/autenticar', controle.autenticar)

rotas.use(verificarAutenticacao)
rotas.get('/', controle.index)
rotas.get('/internet', controle.internet)

rotas.get('/perfil', perfilUsuario)
rotas.post('/alterar', usuario.alterar)

rotas.get('/logout', controle.logout)

// Exportar as rotas usando a sintaxe de exportação ES6
export default rotas
