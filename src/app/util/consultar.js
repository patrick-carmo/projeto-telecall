import knex from '../config/conexao.js'

async function consultarUsuarios(filtros, idUsuario) {
  try {
    const query = knex('usuario').select('*')

    if (Object.keys(filtros).length > 0) {
      query.where((query)=>{
        for (const chave in filtros) {
          query.orWhere(chave, filtros[chave])
        }
      })
    }

    if (idUsuario) {
      query.whereNot('id', idUsuario)
    }
    
    const resultado = await query.first()

    return resultado
  } catch (error) {
    console.error('Erro na consulta:', error.message)
    throw error
  }
}

export default consultarUsuarios
