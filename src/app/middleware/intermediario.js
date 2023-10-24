import jwt from 'jsonwebtoken'
import knex from '../config/conexao.js'
import erro from '../util/erro.js'

const verificarAutenticacao = async (req, res, next) => {
  const token = req.cookies.token

  try {
    if (!token) {
      erro(401, 'Sessao expirada!')
    }

    const { id } = jwt.verify(token, process.env.senha)

    const usuario = await knex('usuario').where('id', id).first()

    if (!usuario) {
      erro(403, 'usuário não encontrado!')
    }

    const { nome, login } = usuario

    nome
      ? (req.nomeOuLogin = nome[0].toUpperCase() + nome.slice(1).split(' ')[0])
      : (req.nomeOuLogin = login)

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

export default verificarAutenticacao
