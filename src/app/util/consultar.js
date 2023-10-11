const pool = require('../config/conexao')

async function consultarUsuarios(filtros, idUsuario) {
  try {
    const colunas = Object.keys(filtros)
    const valores = Object.values(filtros)
    const placeholders = colunas.map((coluna, index) => `${coluna} = $${index + 1}`)

    let sql = `select * from usuario where ${placeholders.join(' or ')}`

    if(idUsuario){
      sql += ` and id <> ${idUsuario}`
    }
    
    const resultado = await pool.query(sql, valores)

    return resultado.rows
  } catch (error) {
    console.error('Erro na consulta:', error.message)
    throw error
  }
}

module.exports = consultarUsuarios
