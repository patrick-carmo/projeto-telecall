const pool = require('../config/conexao')
const jwt = require('jsonwebtoken')

const perfilUsuario = async (req, res) => {
  const token = req.cookies.token
  const { id } = jwt.verify(token, process.env.senha)

  try {
    const query = `
      select u.*, e.*
      from usuario AS u
      left join usuario_endereco as ue on u.id = ue.usuario_id
      left join endereco as e on ue.endereco_id = e.id
      where u.id = $1;
    `
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

module.exports = perfilUsuario
