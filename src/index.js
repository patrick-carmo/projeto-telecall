const express = require('express')
const app = express()
const rotas = require('./app/routes/rotas')
const port = 3000

app.use(express.json())
app.use(rotas)

app.listen(port, ()=>{
  console.log(`Servidor rodando na porta ${port}`)
})