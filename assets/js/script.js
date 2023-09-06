import ('./dark.js')

const formProximo = document.querySelector('.form-proximo')
const formAnterior = document.querySelector('.form-anterior')
const botaoSubmit = document.querySelector('#enviar-cadastro')
const tituloModal = document.querySelector('.titulo-modal')
const formularioPrincipal = document.querySelector('.formulario-principal')
const formCadastro = document.querySelector('.cadastro')
const formEndereco = document.querySelector('.form-endereco')
const camposParteAtual = formCadastro.querySelectorAll('.form-control')

const numero = document.querySelector('#complemento')
const cep = document.querySelector('#cep')
const ocultos = document.querySelectorAll('.input-oculto')

const senha1 = document.querySelector('#senha')
const senha2 = document.querySelector('#senha2')
const senhaFeedback = document.querySelector('.invalid-feedback')

senha1.addEventListener('input', () => {
  validatePassword()
})

senha2.addEventListener('input', () => {
  validatePassword()
})

function validatePassword() {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (senha1.value.match(passwordRegex)) {
    senha1.classList.remove('is-invalid')
    senha1.classList.add('is-valid')
    senhaFeedback.style.display = 'none'
  } else {
    senha1.classList.remove('is-valid')
    senha1.classList.add('is-invalid')
    senhaFeedback.style.display = 'block'
  }

  if (senha1.value === senha2.value) {
    senha2.classList.remove('is-invalid')
    senha2.classList.add('is-valid')
  } else {
    senha2.classList.remove('is-valid')
    senha2.classList.add('is-invalid')
  }
}

formAnterior.addEventListener('click', () => {
  formCadastro.style.display = 'grid'
  formEndereco.style.display = 'none'
  tituloModal.textContent = 'Cadastro de login'
})

formProximo.addEventListener('click', function () {
  let camposValidos = true

  camposParteAtual.forEach((campo) => {
    if (!campo.checkValidity()) {
      camposValidos = false
      campo.classList.add('is-invalid')
    } else {
      campo.classList.remove('is-invalid')
      campo.classList.add('is-valid')
    }
  })

  if (
    senha1.value === '' ||
    senha2.value === '' ||
    senha1.value !== senha2.value
  ) {
    camposValidos = false
    senha1.classList.add('is-invalid')
    senha2.classList.add('is-invalid')
  } else {
    senha1.classList.remove('is-invalid')
    senha2.classList.remove('is-invalid')
  }

  if (camposValidos) {
    formCadastro.style.display = 'none'
    formEndereco.style.display = 'grid'
    tituloModal.textContent = 'Endereço'
    // botaoSubmit.style.display = 'inline-block'
  }
})

camposParteAtual.forEach((campo) => {
  campo.addEventListener('input', () => {
    if (!campo.checkValidity()) {
      campo.classList.remove('is-valid')
      campo.classList.add('is-invalid')
    } else {
      campo.classList.remove('is-invalid')
      campo.classList.add('is-valid')
    }
  })
})

const limpar = document.querySelector('.botao-limpar')

limpar.addEventListener('click', function () {
  camposParteAtual.forEach((campo) => {
    campo.classList.remove('is-invalid', 'is-valid')
  })

  senha1.classList.remove('is-invalid')
  senha2.classList.remove('is-invalid')

  cep.classList.remove('is-invalid', 'is-valid')
  cep.value = ''

  formEndereco.style.display = 'none'
  formCadastro.style.display = 'grid'
  botaoSubmit.style.display = 'none'

  formularioPrincipal.classList.remove('was-validated')

  formEndereco.style.gridTemplateColumns = '1fr'

  ocultos.forEach((campos) => (campos.style.display = 'none'))
})
;(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      },
      false
    )
  })
})()

$('#cep').mask('00000-000')
$('#celular').mask('+55 (00) 00000-0000')
$('#fixo').mask('+55 (00) 0000-0000')
$('#cpf').mask('000.000.000-00', { reverse: true })

const showData = (result) => {
  for (const campo in result) {
    if (document.querySelector('#' + campo)) {
      document.querySelector('#' + campo).value = result[campo]
      console.log(campo)
    }
  }
}

cep.addEventListener('input', (e) => {
  const search = cep.value.replace('-', '').trim()
  const options = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  }

  cep.classList.remove('is-invalid')
  cep.classList.remove('is-valid')

  if (search.length === 8) {
    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
      .then((response) => {
        response.json().then((data) => {
          if (data.erro) {
            cep.classList.add('is-invalid')
            ocultos.forEach((campo) => {
              campo.style.display = 'none'
              formEndereco.style.gridTemplateColumns = '1fr'
            })
          } else {
            showData(data)
            ocultos.forEach((campo) => {
              campo.style.display = 'inline-block'
              formEndereco.style.gridTemplateColumns = '1fr 1fr'
            })
            cep.classList.add('is-valid')
            botaoSubmit.style.display = 'inline-block'
          }
        })
      })
      .catch((e) => console.log(`Erro: ${e}`, messege))
  } else {
    ocultos.forEach((campo) => {
      campo.style.display = 'none'
      formEndereco.style.gridTemplateColumns = '1fr'
      botaoSubmit.style.display = 'none'
    })
  }
})

formularioPrincipal.addEventListener('submit', (event) => {
  event.preventDefault()

  const numeroValido = numero.value.trim() !== ''

  if (!cep.classList.contains('is-valid')) {
    cep.classList.add('is-invalid')
  } else if (!numero.classList.contains('is-valid') && !numeroValido) {
    numero.classList.add('is-invalid')
  } else {
    formularioPrincipal.submit()
  }
})