const pool = require('../config/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const operacao = require('../util/operacao')

const usuario = {
  cadastrar: async (req, res) => {
    const dados = req.body
    const erros = []

    const senha = await bcrypt.hash(dados.senha, 10)
    try {
      const erroOperacao = await operacao(dados)

      if (erroOperacao) {
        erros.push(erroOperacao)
        throw erros
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
      return res
        .status(error[0].error.status || 500)
        .json({ mensagem: error[0].error.message || error.message, dados: erros[0].erros })
    }
  },

  alterar: async (req, res) => {
    const dados = req.body
    const token = req.cookies.token
    const { id } = jwt.verify(token, process.env.senha)

    const erros = []

    const senha = await bcrypt.hash(dados.senha, 10)
    try {

      const erroOperacao = await operacao(dados, id)

      if (erroOperacao) {
        erros.push(erroOperacao)
        throw erros
      }
      const client = await pool.connect()
      await client.query('begin')
      try {
        const queryUsuario = `
  update usuario
  set nome = $1, nascimento = $2, sexo = $3, nome_materno = $4, cpf = $5, celular = $6, fixo = $7, senha = $8
  where id = $9
  returning *;
`

        const queryEndereco = `
  update endereco
  set cep = $1, uf = $2, bairro = $3, localidade = $4, logradouro = $5, complemento = $6, complemento_adicional = $7
  where id in (
    select endereco_id
    from usuario_endereco
    where usuario_id = $8
  )
  returning *;
`

        const valuesUsuario = [
          dados.nome.toLowerCase(),
          dados.nascimento,
          dados.sexo,
          dados.nomeMaterno.toLowerCase(),
          dados.cpf,
          dados.celular,
          dados.fixo,
          senha,
          id,
        ]

        const valuesEndereco = [
          dados.cep,
          dados.uf,
          dados.bairro,
          dados.localidade,
          dados.logradouro,
          dados.complemento,
          dados.complementoAdicional,
          id,
        ]

        await client.query(queryUsuario, valuesUsuario)
        await client.query(queryEndereco, valuesEndereco)
        await client.query('commit')

        res.status(203).json({ mensagem: 'Cadastrado alterado com sucesso!' })
        
      } catch (error) {
        await client.query('rollback')
        throw error
      } finally {
        client.release()
      }
    } catch (error) {
      if (erros.length > 0) {
        return res
          .status(error[0].error.status || 500)
          .json({ mensagem: error[0].error.message || error.message, dados: erros[0].erros })
      }
      return res.status(error.status || 500).json({ mensagem: error.message })
    }
  },
}

module.exports = usuario
