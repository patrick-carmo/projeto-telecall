import knex from '../config/conexao.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import erro from '../util/erro.js'
import render from '../util/render.js'

const controle = {
  index: (req, res) => {
    render(req, res, 'index')
  },
  login: (req, res) => {
    render(req, res, 'login')
  },
  internet: (req, res) => {
    render(req, res, 'internet')
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

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: true,
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

export default controle
