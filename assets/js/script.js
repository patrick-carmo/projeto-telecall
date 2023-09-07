import ('./dark.js')

//Botões
const formProximo = document.querySelector('.form-proximo')
const formAnterior = document.querySelector('.form-anterior')
const botaoSubmit = document.querySelector('#enviar-cadastro')

//Layout
const tituloModal = document.querySelector('.titulo-modal')
const formularioPrincipal = document.querySelector('.formulario-principal')
const formCadastro = document.querySelector('.cadastro')
const formEndereco = document.querySelector('.form-endereco')

//Inputs
const camposParteAtual = formCadastro.querySelectorAll('.form-control')
const numero = document.querySelector('#complemento')
const cep = document.querySelector('#cep')
const ocultos = document.querySelectorAll('.input-oculto')

const senha1 = document.querySelector('#senha')
const senha2 = document.querySelector('#senha2')

const senhaFeedback = document.querySelectorAll('.feedback-senha')
const senhaFeedback2 = document.querySelectorAll('.feedback-senha2')


//Validar input da senha

function validarSenha(campo) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  //Controlador para que o input das senhas seja alterado somente quando algum valor for preenchido
  const idSenhas = ['senha', 'senha2']
  const campoId = campo.getAttribute('id')

  if(idSenhas.includes(campoId)){
    const senhaFeedback2campo =
      campo.parentNode.querySelectorAll('.feedback-senha2')

    senhaFeedback.forEach((elemento) => {
      elemento.style.display = 'none'
    })

    senhaFeedback2campo.forEach((elemento) => {
      elemento.style.display = campo.value.match(regex) ? 'none' : 'block'
    })

    if (senha1.value.match(regex) && senha2.value.match(regex)) {
      if (senha1.value === senha2.value) {
        senha1.classList.remove('is-invalid')
        senha2.classList.remove('is-invalid')
        senha1.classList.add('is-valid')
        senha2.classList.add('is-valid')
        senhaFeedback.forEach((elemento) => (elemento.style.display = 'none'))
        return
      }
      senhaFeedback.forEach((elemento) => {
        elemento.style.display = 'block'
      })
      senha1.classList.add('is-invalid')
      senha2.classList.add('is-invalid')

      return
    }
  }
}

//Verifica o input atual em tempo real

camposParteAtual.forEach((campo) => {
  campo.addEventListener('input', () => {
    if (!campo.checkValidity()) {
      campo.classList.remove('is-valid')
      campo.classList.add('is-invalid')
    } else {
      campo.classList.remove('is-invalid')
      campo.classList.add('is-valid')
    }
    
    validarSenha(campo)
  })
})

//botões de voltar e avançar

formAnterior.addEventListener('click', function() {
  formCadastro.style.display = 'grid'
  formEndereco.style.display = 'none'
  tituloModal.textContent = 'Cadastro de login'
})

formProximo.addEventListener('click', function () {
  let camposValidos = true

  function verificarCampos() {
    if (camposValidos) {
      formCadastro.style.display = 'none'
      formEndereco.style.display = 'grid'
      tituloModal.textContent = 'Endereço'
    }
  }

  camposParteAtual.forEach((campo) => {
    if (!campo.checkValidity()) {
      camposValidos = false
      campo.classList.add('is-invalid')
      return
    } else {
      campo.classList.remove('is-invalid')
      campo.classList.add('is-valid')
    }
  })

  if (
    senha1.value === '' ||
    senha2.value === ''
  ) {
    camposValidos = false
    senha1.classList.add('is-invalid')
    senha2.classList.add('is-invalid')
    

    senhaFeedback2.forEach(campo => {
      campo.style.display = 'block'
    })

    return
  } else {
    senha1.classList.remove('is-invalid')
    senha2.classList.remove('is-invalid')
  }

  if(senha1.value !== senha2.value){
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



//botão de limpar todos os campos dos inputs

const limpar = document.querySelector('.botao-limpar')

limpar.addEventListener('click', function () {
  camposParteAtual.forEach((campo) => {
    campo.classList.remove('is-invalid', 'is-valid')
  })

  senha1.classList.remove('is-invalid')
  senha2.classList.remove('is-invalid')
  senha1.classList.remove('is-valid')
  senha2.classList.remove('is-valid')
  senhaFeedback.forEach(campo=>campo.style.display = 'none')
  senhaFeedback2.forEach(campo=>campo.style.display = 'none')

  cep.classList.remove('is-invalid', 'is-valid')
  cep.value = ''

  formEndereco.style.display = 'none'
  formCadastro.style.display = 'grid'
  botaoSubmit.style.display = 'none'

  formularioPrincipal.classList.remove('was-validated')

  formEndereco.style.gridTemplateColumns = '1fr'

  ocultos.forEach((campos) => (campos.style.display = 'none'))
})


//Bootstrap 5

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

//Máscara jquery

$('#cep').mask('00000-000')
$('#celular').mask('+55 (00) 00000-0000')
$('#fixo').mask('+55 (00) 0000-0000')
$('#cpf').mask('000.000.000-00', { reverse: true })

const showData = (result) => {
  for (const campo in result) {
    if (document.querySelector('#' + campo)) {
      document.querySelector('#' + campo).value = result[campo]
    }
  }
}

//Função para validar o cep

cep.addEventListener('input', (e) => {
  const search = cep.value.replace('-', '').trim()
  const options = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  }

cep.classList.remove('is-invalid')

if (search.length >= 8) {
  fetch(`https://viacep.com.br/ws/${search}/json/`, options)
    .then((response) => {
      response.json().then((data) => {
        if (data.erro) {
          cep.classList.remove('is-valid') // Remova a classe aqui, se o CEP for inválido
          cep.classList.add('is-invalid') // Adicione a classe is-invalid para indicar erro
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
          cep.classList.remove('is-invalid') // Remova a classe is-invalid aqui
          cep.classList.add('is-valid') // Adicione a classe is-valid apenas quando o CEP for válido
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

//Função de controle do submit

formularioPrincipal.addEventListener('submit', function(event){
  event.preventDefault()
  let temErro = false

  const numeroValido = numero.value.trim() !== ''
  numero.classList.remove('is-invalid')
  const regexNumero = /^[\wÀ-ÿ.,\s]*$/

  if (!cep.classList.contains('is-valid')) {
    cep.classList.add('is-invalid')
    return
  } else if (!numeroValido || !numero.value.match(regexNumero)) {
    numero.classList.add('is-invalid')
    return
  }
  numero.classList.add('is-valid')
  camposParteAtual.forEach((elemento) => {
    if (elemento.classList.contains('is-invalid')) {
      temErro = true
    }
  })
  if(!temErro){
    formularioPrincipal.submit()
  }
})