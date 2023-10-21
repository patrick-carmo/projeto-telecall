// Importar os módulos usando o import
import consultarUsuarios from '../util/consultar.js'
import regex from '../util/regex.js'
import erro from '../util/erro.js'

// Criar a função de operacao
async function operacao(dados, id_usuario) {
  const erros = []
  try {
    const naoPreenchidos = []
    const camposObrigatorios = { ...dados }
    delete camposObrigatorios.complementoAdicional

    for (const campo in camposObrigatorios) {
      const valor = camposObrigatorios[campo] ? camposObrigatorios[campo].trim() : null
      if (valor === null || valor === '') {
        naoPreenchidos.push(campo)
      }
    }
    if (naoPreenchidos.length !== 0) {
      erros.push(naoPreenchidos)
      erro(400, `Campos obrigatórios: ${naoPreenchidos}`)
    }

    const camposInvalidos = []
    for (const campo in regex) {
      if (regex[campo]) {
        if (!regex[campo].test(dados[campo])) {
          camposInvalidos.push(campo)
        }
      }
    }

    if (camposInvalidos.length !== 0) {
      erros.push(camposInvalidos)
      erro(400, `Campos inválidos: ${camposInvalidos}`)
    }

    const filtros = {
      login: dados.login,
      celular: dados.celular,
      fixo: dados.fixo,
      cpf: dados.cpf,
    }
    const dadosDaConsulta = await consultarUsuarios(filtros, id_usuario)

    const dadosIguais = []

    for (const chave in filtros) {
      const valorFiltro = filtros[chave]

      const temValorIgual = dadosDaConsulta.some((elemento) => elemento[chave] === valorFiltro)

      if (temValorIgual) {
        dadosIguais.push(chave)
      }
    }

    if (dadosIguais.length > 0) {
      erros.push(dadosIguais)
      erro(409, `Dados já cadastrados por outro usuario: ${dadosIguais}`)
    }
  } catch (error) {
    return { erros, error }
  }
}

// Exportar a função de operacao usando a sintaxe de exportação ES6
export default operacao
