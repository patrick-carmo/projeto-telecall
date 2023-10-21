// Importar os módulos usando o import
import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import dotenv from 'dotenv'
import rotas from './app/routes/rotas.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Configurar o dotenv
dotenv.config()

// Criar o app express
const app = express()

// Definir a porta
const port = process.env.porta || 3000

// Configurar o ejs
app.set('view engine', 'ejs')
// Usar o código alternativo para obter o __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.set('views', __dirname + '/app/views')

// Usar os middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/assets'))

// Usar as rotas
app.use(rotas)

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
