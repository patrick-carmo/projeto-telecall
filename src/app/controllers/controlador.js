const path = require('path')
const pool = require('../config/conexao')
const session = require('express-session')

const controle = {
  index: (req, res) => {
      res.render('index')
  },
  login: (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
  },
  autenticar: async (req, res) => {
    const { login, senha } = req.body

    try {
      let query = `select * from usuario where login = $1`
      let values = [login]

      const resultado = await pool.query(query, values)
      if (resultado.rows.length === 0) {
        throw new Error('Usuário não encontrado!')
      }
      const senhaCadastrada = resultado.rows[0].senha

      if (senha !== senhaCadastrada) {
        throw new Error('Senha inválida!')
      }

      const nomeDoUsuario = resultado.rows[0].login
      req.session.nomeDoUsuario = nomeDoUsuario
      req.session.usuarioLogado = true
      // res.render('index', { title: 'Telecall' })
      res.redirect('/')
    } catch (e) {
      req.session.erro = e.message
      res.redirect('/login.html')
    }
  },

  verificarAutenticacao: (req, res, next) => {
    if (req.session.usuarioLogado) {
      return next()
    }

    res.redirect('/login.html')
  },

  erro: (req, res) => {
    res.json({ error: req.session.erro || null })
  },

  limparErro: (req, res) => {
    delete req.session.erro
    res.sendStatus(200)
  },

  nome: (req, res) => {
    if (!req.session.usuarioLogado) {
      return res.json({ autenticado: false })
    }
    res.json({ autenticado: true, nomeDoUsuario: req.session.nomeDoUsuario })
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (!err) {
        return res.redirect('/login.html')
      }
      console.error('Erro ao destruir sessão:', err)
    })
  },
}
module.exports = controle
