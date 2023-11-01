import consultarUsuarios from '../util/consultar.js'
import jwt from 'jsonwebtoken'

const verificarDados = (schema) => async (req, res, next) => {
  const dados = req.body

  try {
    await schema.validateAsync(dados, { abortEarly: false })

    const filtros = {
      login: dados.login,
      celular: dados.celular,
      fixo: dados.fixo,
      cpf: dados.cpf,
    }

    const dadosDaConsulta = []

    if (req.cookies.token) {
      const { id } = jwt.verify(req.cookies.token, process.env.senha)
      dadosDaConsulta.push(await consultarUsuarios(filtros, id))
    } else {
      dadosDaConsulta.push(await consultarUsuarios(filtros))
    }

    const dadosIguais = []

    if (dadosDaConsulta[0]) {
      for (const chave in filtros) {
        const valorFiltro = filtros[chave]

        const temValorIgual = dadosDaConsulta.some((elemento) => elemento[chave] === valorFiltro)

        if (temValorIgual) {
          dadosIguais.push(chave)
        }
      }
    }

    if (dadosIguais.length > 0) {
      return res.status(400).json({
        mensagem: `Dados já cadastrados: ${dadosIguais.join(', ')}`,
        erros: dadosIguais,
      })
    }

    next()
  } catch (error) {
    console.log(error)

    if (error.details) {
      const erros = error.details.reduce((accumulator, detalhes) => {
        accumulator.push(...detalhes.path)
        return accumulator
      }, [])

      return res.status(400).json({
        mensagem: `Campos inválidos: ${erros.join(', ')}`,
        erroDetalhado: error.details,
      })
    }

    return res.status(500).json({ mensagem: error.menssage })
  }
}

export default verificarDados
