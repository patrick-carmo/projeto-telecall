import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import rotas from './app/routes/rotas.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()

const port = process.env.porta || 3000


app.set('view engine', 'ejs')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.set('views', __dirname + '/app/views')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/assets'))

app.use(rotas)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})