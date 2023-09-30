const express = require('express')
const session = require('express-session')
require('dotenv').config()
const app = express()

const rotas = require('./app/routes/rotas')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/src/assets'))
app.use(
  session({
    secret: '0000',
    resave: false,
    saveUninitialized: true,
  })
)
app.use(rotas)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
