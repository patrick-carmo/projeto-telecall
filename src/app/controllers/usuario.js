import knex from '../config/conexao.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const cadastrar = async (req, res) => {
  const dados = req.body
  const senha = await bcrypt.hash(dados.senha, 10)

  try {
    await knex.transaction(async (trx) => {
      const usuario = await trx('usuario')
        .insert({
          nome: dados.nome.toLowerCase(),
          nascimento: dados.nascimento,
          sexo: dados.sexo,
          nome_materno: dados.nomeMaterno.toLowerCase(),
          cpf: dados.cpf,
          celular: dados.celular,
          fixo: dados.fixo,
          login: dados.login,
          senha: senha,
        })
        .returning('*')

      const endereco = await trx('endereco')
        .insert({
          cep: dados.cep,
          uf: dados.uf,
          bairro: dados.bairro,
          localidade: dados.localidade,
          logradouro: dados.logradouro,
          complemento: dados.complemento,
          complemento_adicional: dados.complementoAdicional,
        })
        .returning('*')

      await trx('usuario_endereco').insert({
        usuario_id: usuario[0].id,
        endereco_id: endereco[0].id,
      })

      const token = jwt.sign(
        {
          id: usuario[0].id,
          nome: usuario[0].nome,
          login: usuario[0].login,
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
    })

    res.status(203).json({ mensagem: 'Cadastrado com sucesso!' })
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro interno do servidor.' })
  }
}

const alterar = async (req, res) => {
  const dados = req.body
  const token = req.cookies.token
  const { id } = jwt.verify(token, process.env.senha)

  const senha = await bcrypt.hash(dados.senha, 10)
  try {
    await knex.transaction(async (operacao) => {
      await operacao('usuario')
        .update({
          nome: dados.nome.toLowerCase(),
          nascimento: dados.nascimento,
          sexo: dados.sexo,
          nome_materno: dados.nomeMaterno.toLowerCase(),
          cpf: dados.cpf,
          celular: dados.celular,
          fixo: dados.fixo,
          login: dados.login,
          senha: senha,
        })
        .where('id', id)

      await operacao('endereco')
        .update({
          cep: dados.cep,
          uf: dados.uf,
          bairro: dados.bairro,
          localidade: dados.localidade,
          logradouro: dados.logradouro,
          complemento: dados.complemento,
          complemento_adicional: dados.complementoAdicional,
        })
        .whereIn('id', operacao('usuario_endereco').select('endereco_id').where('usuario_id', id))
    })

    res.status(203).json({ mensagem: 'Cadastro alterado com sucesso!' })
  } catch (error) {
    res.status(500).json({ mensagem: error.message })
  }
}

export { cadastrar, alterar }
