import { enviarRequisicaoPost } from './axios.js'

export default function cadastrarOuAlterar() {
  const formularioCadastro = document.getElementById('formulario-cadastro')
  const erroCadastro = document.getElementById('erroCadastro')
  const modal = document.querySelector('.modal-content')

  const formularioAlterar = document.getElementById('formulario-alterar')

  const tipo = document.querySelector('.tipo')

  if (formularioCadastro) {
    formularioCadastro.addEventListener('submit', cadastrar)
  }

  if (formularioAlterar) {
    formularioAlterar.addEventListener('submit', cadastrar)
  }

  async function cadastrar(e) {
    e.preventDefault()

    const campos = document.querySelectorAll('.input-cadastro')

    let camposValidos = true

    campos.forEach((campo) => {
      if (!campo.checkValidity()) {
        campo.classList.add('is-invalid')
        campo.classList.remove('is-valid')
        camposValidos = false
        return
      } else {
        campo.classList.remove('is-invalid')
        campo.classList.add('is-valid')
      }
    })

    const valores = {}

    function obterCampo(array) {
      for (const id of array) {
        const input = document.getElementById(id)
        const valor = input.value
        valores[id] = valor
      }
    }

    const ids = [
      'nome',
      'nascimento',
      'sexo',
      'nomeMaterno',
      'cpf',
      'celular',
      'fixo',
      'login',
      'senha',
      'cep',
      'uf',
      'bairro',
      'localidade',
      'logradouro',
      'complemento',
      'complementoAdicional',
    ]
    try {
      obterCampo(ids)
      if (camposValidos) {
        if (tipo.value === 'cadastrar') {
          await enviarRequisicaoPost('/cadastrar', valores)
          window.location.href = '/'
          return
        }
        await enviarRequisicaoPost('/alterar', valores)

        if (tipo.value === 'alterar') {
          const limpar = document.getElementById('pegarDados')
          limpar.click()

          modal.style.border = '2px solid green'
          erroCadastro.style.display = 'block'
          erroCadastro.style.color = 'green'
          erroCadastro.textContent = 'Cadastro alterado com sucesso!'
          setTimeout(() => {
            modal.style.border = ''
            erroCadastro.style.display = 'none'
            erroCadastro.style.color = ''
            erroCadastro.textContent = ''
          }, 10000)
        }
      }
    } catch (error) {
      erroCadastro.style.display = 'block'

      const mensagem = error.response.data.mensagem ?? error.message
      const erroValidacaoInput = error.response.data.erroDetalhado
      const erroCadastroOuAlteracao = error.response.data.erros

      function exibirErroInput(erro) {
        const excessoes = ['uf', 'bairro', 'localidade', 'logradouro', 'sexo']

        for (const detalhes of erro) {
          const dados = detalhes.path ? detalhes.path[0] : detalhes

          if (excessoes.includes(dados)) {
            continue
          }
          const input = document.getElementById(dados)
          const divDoInput = input.parentElement
          const paragrafoErro = divDoInput.querySelector('p')

          paragrafoErro.textContent =
            detalhes.message ?? `Campo ${detalhes} já cadastrado por outro usuário`
          input.classList.add('is-invalid')
        }
      }

      if (erroValidacaoInput) {
        exibirErroInput(erroValidacaoInput)
      }
      if (erroCadastroOuAlteracao) {
        exibirErroInput(erroCadastroOuAlteracao)
      }

      modal.style.border = '2px solid red'
      erroCadastro.textContent = mensagem
      setTimeout(() => {
        modal.style.border = ''
        erroCadastro.style.display = 'none'
        erroCadastro.textContent = ''
      }, 10000)
    }
  }
}
