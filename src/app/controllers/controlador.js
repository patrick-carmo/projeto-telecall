const path = require('path')
const pool = require('../config/conexao')
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
      const query = `select * from usuario where login = $1`
      const values = [login]

      const resultado = await pool.query(query, values)

      if (resultado.rowCount === 0) {
        erro(400, 'Login incorreto!')
      }

      const confirmarSenha = await bcrypt.compare(senha, resultado.rows[0].senha)

      if (!confirmarSenha) {
        erro(400, 'Senha incorreta!')
      }

      const token = jwt.sign(
        { id: resultado.rows[0].id, nome: resultado.rows[0].nome, login: resultado.rows[0].login },
        process.env.senha,
        {
          expiresIn: '30d',
        }
      )

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
      })

      res.status(200).json({ mensagem: 'Login efetuado com sucesso!' })
    } catch (e) {
      res.status(e.status || 500).json({ mensagem: e.message })
    }
  },

  logout: (req, res) => {
    res.clearCookie('token')
    res.redirect('/login')
  },
}
module.exports = controle
