const jwt = require('jsonwebtoken')
const pool = require('../config/conexao')
const erro = require('../util/erro')

const verificarAutenticacao = async (req, res, next) => {
  const token = req.cookies.token
  try {
    if (!token) {
      erro(401, 'Sessao expirada!')
    }


    const { id, nome, login } = jwt.verify(token, process.env.senha)

    const usuario = await pool.query('select * from usuario where id = $1', [id])

    if (!usuario) {
      erro(403, 'usuário não encontrado!')
    }
    
    nome ? req.nomeOuLogin = nome[0].toUpperCase() + nome.slice(1).split(' ')[0] : req.nomeOuLogin = login

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.cookie('sessao_expirada', 'Sessão expirada!')
      res.clearCookie('token')
      return res.status(401).redirect('/login')
    }

    res.clearCookie('token')
    return res.status(error.status || 500).redirect('/login')
  }
}

module.exports = verificarAutenticacao
