const pool = require('../config/conexao')
const bcrypt = require('bcrypt')
const consultarUsuarios = require('../util/consultar')
const regex = require('../util/regex')
const erro = require('../util/erro')
const jwt = require('jsonwebtoken')

const dadosUsuario = async (req, res) => {
  const token = req.cookies.token
  const { id } = jwt.verify(token, process.env.senha)

  try {
    const query = `select * from usuario where id = $1`
    const values = [id]

    const {rows} = await pool.query(query, values)

    const userData = {
      ...rows[0]
    }
    res.status(200).json(userData)
  } catch (error) {
    return res.status(500).json({ mensagem: error.message })
  }
}

module.exports = dadosUsuario
