const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express()

const rotas = require('./app/routes/rotas')
const port = process.env.porta || 3000



app.set('view engine', 'ejs')
app.set('views', __dirname + '/app/views')
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/assets'))

app.use(rotas)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
