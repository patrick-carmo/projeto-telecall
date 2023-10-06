import { realizarSolicitacao } from '../axios.js'

export default function verificarCadastro() {
  const formulario = document.getElementById('formulario-cadastro')
  const erroCadastro = document.getElementById('erroCadastro')

  formulario.addEventListener('submit', cadastrar)

  async function cadastrar(e) {
    e.preventDefault()

    const campos = document.querySelectorAll('.input-cadastro')

    let camposValidos = true

    campos.forEach((campo) => {
      if (!campo.checkValidity()) {
        campo.classList.add('is-invalid')
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
        await realizarSolicitacao('/cadastrar', valores)
        window.location.href = '/'
      }
    } catch (error) {
      erroCadastro.style.display = 'block'
      const mensagem = error.response.data.mensagem.replaceAll(',', ', ').trim()
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

      erroCadastro.textContent = mensagem
      console.error(error)
      setTimeout(() => {
        erroCadastro.style.display = 'none'
        erroCadastro.textContent = ''
      }, 5000)
    }
  }
}
