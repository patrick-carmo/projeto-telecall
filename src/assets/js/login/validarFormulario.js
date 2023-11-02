import mostrarSenha from './mostrarSenha.js'
mostrarSenha()

export default function validarFormulario() {
  //Botões
  const formProximo = document.querySelector('.form-proximo')
  const formAnterior = document.querySelector('.form-anterior')
  const botaoSubmit = document.querySelector('#enviar-cadastro')

  const tituloModal = document.querySelector('.titulo-modal')
  const formularioPrincipal = document.querySelector('.formulario-principal')
  const formCadastro = document.querySelector('.cadastro')
  const formEndereco = document.querySelector('.form-endereco')

  const inputsCadastro = formCadastro.querySelectorAll('.form-control')
  const inputsEndereco = formEndereco.querySelectorAll('.form-control')

  const numero = document.querySelector('#complemento')
  const cep = document.querySelector('#cep')
  const ocultos = document.querySelectorAll('.input-oculto')

  const senha1 = document.querySelector('#senha')
  const senha2 = document.querySelector('#senha2')

  const senhaFeedback = document.querySelectorAll('.feedback-senha')

  function validarSenha(campo) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const campoId = campo.getAttribute('id')

    if (campoId === 'senha' || campoId === 'senha2') {
      for (const elemento of senhaFeedback) {
        elemento.style.display = 'none'
      }

      if (campo.value.trim() === '') {
        campo.classList.remove('is-valid', 'is-invalid')
        return
      }

      if (!campo.value.match(regex)) {
        campo.classList.add('is-invalid')
        return
      }

      if (senha1.value.match(regex) && senha2.value.match(regex)) {
        if (senha1.value === senha2.value) {
          senha1.classList.remove('is-invalid')
          senha2.classList.remove('is-invalid')
          senha1.classList.add('is-valid')
          senha2.classList.add('is-valid')

          return
        }

        for (const elemento of senhaFeedback) {
          elemento.style.display = 'block'
        }
        senha1.classList.add('is-invalid')
        senha2.classList.add('is-invalid')
      }
    }
  }

  inputsCadastro.forEach((campo) => {
    campo.addEventListener('input', () => {
      if (campo.value.trim() === '') {
        campo.classList.remove('is-valid', 'is-invalid')
      } else {
        if (!campo.checkValidity()) {
          campo.classList.remove('is-valid')
          campo.classList.add('is-invalid')
        }

        campo.classList.remove('is-invalid')
        campo.classList.add('is-valid')

        validarSenha(campo)
      }
    })
  })

  numero.addEventListener('input', () => {
    if (numero.value.trim() === '' || !/^(?![.,\s])[\wÀ-ÿ.,\s]{0,}$/.test(numero.value)) {
      numero.classList.remove('is-valid')
      numero.classList.add('is-invalid')
    } else {
      numero.classList.remove('is-invalid')
      numero.classList.add('is-valid')
    }
  })

  formAnterior.addEventListener('click', function () {
    formAnterior.disabled = true
    formProximo.disabled = false
    formCadastro.style.display = 'grid'
    formEndereco.style.display = 'none'
    tituloModal.textContent = 'Cadastro de login'
  })

  formProximo.addEventListener('click', function () {
    let camposValidos = true

    function verificarCampos() {
      if (camposValidos) {
        formAnterior.disabled = false
        formProximo.disabled = true
        formCadastro.style.display = 'none'
        formEndereco.style.display = 'grid'
        tituloModal.textContent = 'Endereço'
      }
    }

    function validarCampos(campos) {
      campos.forEach((campo) => {
        if (!campo.checkValidity()) {
          camposValidos = false
          campo.classList.remove('is-valid')
          campo.classList.add('is-invalid')
        } else {
          campo.classList.remove('is-invalid')
          campo.classList.add('is-valid')
        }
      })
    }
    validarCampos(inputsCadastro)

    if (senha1.value === '' || senha2.value === '') {
      camposValidos = false
      senha1.classList.add('is-invalid')
      senha2.classList.add('is-invalid')

      senhaFeedback.forEach((campo) => {
        campo.style.display = 'block'
      })

      return
    } else {
      senha1.classList.remove('is-invalid')
      senha2.classList.remove('is-invalid')
    }

    if (senha1.value !== senha2.value) {
      camposValidos = false
      senha1.classList.add('is-invalid')
      senha2.classList.add('is-invalid')
      senhaFeedback.forEach((campo) => {
        campo.style.display = 'block'
      })
      return
    }
    verificarCampos()
  })

  const limpar = document.querySelector('.botao-limpar')

  limpar.addEventListener('click', function () {
    inputsCadastro.forEach((campo) => {
      campo.classList.remove('is-invalid', 'is-valid')
    })
    inputsEndereco.forEach((campo) => {
      campo.classList.remove('is-invalid', 'is-valid')
    })

    senha1.classList.remove('is-invalid')
    senha2.classList.remove('is-invalid')
    senha1.classList.remove('is-valid')
    senha2.classList.remove('is-valid')
    senhaFeedback.forEach((campo) => (campo.style.display = 'none'))

    cep.classList.remove('is-invalid', 'is-valid')
    cep.value = ''

    formEndereco.style.display = 'none'
    formCadastro.style.display = 'grid'
    botaoSubmit.style.display = 'none'

    formAnterior.disabled = true
    formProximo.disabled = false

    formEndereco.style.gridTemplateColumns = '1fr'

    ocultos.forEach((campos) => (campos.style.display = 'none'))
  })

  cep.addEventListener('input', (e) => {
    const search = cep.value.replace('-', '').trim()
    const options = {
      method: 'get',
      mode: 'cors',
      cache: 'default',
    }

    if (search.length >= 8) {
      fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        .then((response) => {
          response.json().then((data) => {
            if (data.erro) {
              cep.classList.remove('is-valid')
              cep.classList.add('is-invalid')
              ocultos.forEach((campo) => {
                campo.style.display = 'none'
              })
              formEndereco.style.gridTemplateColumns = '1fr'
            } else {
              showData(data)
              ocultos.forEach((campo) => {
                campo.style.display = 'inline-block'
                formEndereco.style.gridTemplateColumns = '1fr 1fr'
              })
              cep.classList.remove('is-invalid')
              cep.classList.add('is-valid')
              botaoSubmit.style.display = 'inline-block'
            }
          })
        })
        .catch((e) => console.error(`Erro: ${e}`, messege))
    } else {
      ocultos.forEach((campo) => {
        campo.style.display = 'none'
        formEndereco.style.gridTemplateColumns = '1fr'
        botaoSubmit.style.display = 'none'
        cep.classList.add('is-invalid')
        cep.classList.remove('is-valid')

        if (cep.value.trim() === '') {
          cep.classList.remove('is-valid')
          cep.classList.remove('is-invalid')
        }
      })
    }
  })

  const showData = (result) => {
    for (const campo in result) {
      if (document.querySelector('#' + campo)) {
        document.querySelector('#' + campo).value = result[campo]
      }
    }
  }

  formularioPrincipal.addEventListener('submit', function (event) {
    event.preventDefault()
    let temErro = false

    const numeroValido = numero.value.trim() !== ''
    numero.classList.remove('is-invalid')
    const regexNumero = /^[\wÀ-ÿ.,\s]*$/

    if (!cep.classList.contains('is-valid')) {
      cep.classList.add('is-invalid')
      return
    }
    if (!numeroValido || !numero.value.match(regexNumero)) {
      numero.classList.add('is-invalid')
      return
    }

    inputsCadastro.forEach((elemento) => {
      if (elemento.classList.contains('is-invalid')) {
        temErro = true
      }
    })

    if (!temErro) {
      const tipo = document.querySelector('.tipo')
      const elementos = ['uf', 'bairro', 'localidade', 'logradouro']
      if (tipo.value === 'cadastrar') {
        elementos.push('cpf')
      }

      function habilitarCampos(valor) {
        elementos.forEach((elementoId) => {
          const elemento = document.getElementById(elementoId)
          elemento.disabled = valor
        })
      }
      habilitarCampos(false)
      habilitarCampos(true)

      if (tipo.value === 'cadastrar') {
        const cpf = document.getElementById('cpf')
        cpf.disabled = false
      }
    }
  })

  $('#cep').mask('00000-000')
  $('#celular').mask('+55 (00) 00000-0000')
  $('#fixo').mask('+55 (00) 0000-0000')
  $('#cpf').mask('000.000.000-00', { reverse: true })
}