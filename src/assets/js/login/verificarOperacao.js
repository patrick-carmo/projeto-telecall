import { realizarSolicitacao } from '../axios.js'

export default function verificarCadastro() {
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
      for (let id of array) {
        let input = document.getElementById(id)
        let valor = input.value
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
          await realizarSolicitacao('/cadastrar', valores)
          window.location.href = '/'
          return
        }
        await realizarSolicitacao('/alterar', valores)

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
          }, 5000)
        }
      }
    } catch (error) {
      erroCadastro.style.display = 'block'
      const mensagem = error.response.data.mensagem
        ? error.response.data.mensagem.replaceAll(',', ', ').trim()
        : error.message

      const dados = error.response.data.dados

      campos.forEach((campo) => {
        const id = campo.id
        if (dados) {
          if (dados[0].includes(id)) {
            campo.classList.add('is-invalid')
            campo.classList.remove('is-valid')
          } else {
            campo.classList.remove('is-invalid')
          }
        }
      })

      modal.style.border = '2px solid red'
      erroCadastro.textContent = mensagem
      setTimeout(() => {
        modal.style.border = ''
        erroCadastro.style.display = 'none'
        erroCadastro.textContent = ''
      }, 5000)
    }
  }
}
