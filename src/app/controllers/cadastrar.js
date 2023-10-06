const pool = require('../config/conexao')
const bcrypt = require('bcrypt')
const consultarUsuarios = require('../util/consultar')
const regex = require('../util/regex')
const erro = require('../util/erro')
const jwt = require('jsonwebtoken')

const dados = {
  cadastrar: async (req, res) => {
    const dados = req.body
    const erros = []

    const senha = await bcrypt.hash(dados.senha, 10)
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
      const dadosDaConsulta = await consultarUsuarios(filtros)

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
        erro(409, `Dados já cadastrados: ${dadosIguais}`)
      }

      const client = await pool.connect()
      await client.query('begin')

      try {
        const query = `
          insert into usuario (nome, nascimento, sexo, nome_materno, cpf, celular, fixo, login, senha)
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          returning *;
        `
        const values = [
          dados.nome.toLowerCase(),
          dados.nascimento,
          dados.sexo,
          dados.nomeMaterno.toLowerCase(),
          dados.cpf,
          dados.celular,
          dados.fixo,
          dados.login,
          senha,
        ]
        const usuario = await client.query(query, values)

        const enderecoQuery = `
          insert into endereco (cep, uf, bairro, localidade, logradouro, complemento, complemento_adicional)
          values ($1, $2, $3, $4, $5, $6, $7)
          returning *;
        `
        const enderecoValues = [
          dados.cep,
          dados.uf,
          dados.bairro,
          dados.localidade,
          dados.logradouro,
          dados.complemento,
          dados.complementoAdicional,
        ]
        
        const endereco = await client.query(enderecoQuery, enderecoValues)
        const usuarioEnderecoQuery = `
          insert into usuario_endereco (usuario_id, endereco_id)
          values ($1, $2)
          returning *;
        `

        const usuarioEnderecoValues = [usuario.rows[0].id, endereco.rows[0].id]
        await client.query(usuarioEnderecoQuery, usuarioEnderecoValues)

        await client.query('commit')

        const token = jwt.sign(
          {
            id: usuario.rows[0].id,
            nome: usuario.rows[0].nome,
            login: usuario.rows[0].login,
          },
          process.env.senha,
          {
            expiresIn: '30d',
          }
        )

        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
        })

        res.status(203).json({ mensagem: 'Cadastrado com sucesso!' })
      } catch (error) {
        await client.query('rollback')
        throw error
      } finally {
        client.release()
      }
    } catch (error) {
      return res.status(error.status || 500).json({ mensagem: error.message, dados: erros })
    }
  },
}

module.exports = dados
