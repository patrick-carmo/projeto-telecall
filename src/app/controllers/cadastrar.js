const dados = {
  cadastrar: async (req, res) => {
    const {
      nome,
      nascimento,
      sexo,
      nomeMaterno,
      cpf,
      celular,
      fixo,
      login,
      senha,
      cep,
      uf,
      bairro,
      localidade,
      logradouro,
      complemento,
      complementoAdicional,
    } = req.body

    res.json(req.body)
  },
}

module.exports = dados