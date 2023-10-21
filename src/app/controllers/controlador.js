// Importar os módulos usando o import
import path from 'path'
import { fileURLToPath } from 'url'
import knex from '../config/conexao.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import erro from '../util/erro.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Criar o objeto de controle
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

export default controle
