const path = require('path')
const knex = require('../config/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const erro = require('../util/erro')

const controle = {
  index: (req, res) => {
    const nomeOuLogin = req.nomeOuLogin
    res.status(200).render('index', { nomeOuLogin })
  },
  login: (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
  },
  internet: (req, res) => {
    const nomeOuLogin = req.nomeOuLogin
    res.status(200).render('internet', { nomeOuLogin })
  },
  autenticar: async (req, res) => {
    const { login, senha } = req.body
    try {
      const usuario = await knex('usuario').where('login', login).first()

      if (!usuario) {
        erro(400, 'Login incorreto!')
      }

      const confirmarSenha = await bcrypt.compare(senha, usuario.senha)

      if (!confirmarSenha) {
        erro(400, 'Senha incorreta!')
      }

      const token = jwt.sign({ id: usuario.id }, process.env.senha, {
        expiresIn: '30d',
      })
      req.session.token = token
      res.status(200).json({ mensagem: 'Login efetuado com sucesso!' })
    } catch (e) {
      res.status(e.status || 500).json({ mensagem: e.message })
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.clearCookie('connect.sid')
    res.redirect('/login')
  },
}
module.exports = controle
