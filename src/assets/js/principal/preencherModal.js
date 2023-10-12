import cadastro from '../login/cadastro.js'
cadastro()

function buscarDados() {
  axios
    .get('/perfil')
    .then((response) => {
      const userData = response.data

      function formatarData(data) {
        const dataFormatada = new Date(data).toISOString().split('T')[0]
        return dataFormatada
      }

      const ids = []

      const campos = document.querySelectorAll('.input-cadastro')

      campos.forEach((campo) => {
        ids.push(campo.id)
        campo.value = ''
      })

      const idsFiltrados = ids.filter(
        (id) => !['senha', 'senha2', 'complementoAdicional', 'cep'].includes(id)
      )
      idsFiltrados.forEach((id) => {
        const campo = document.getElementById(id)
        if (id === 'nomeMaterno') {
          campo.value = userData.nome_materno
          return
        }
        if (id === 'nascimento') {
          campo.value = formatarData(userData.nascimento)
          return
        }
        campo.value = userData[id]
      })
    })
    .catch((error) => {
      console.error('Erro ao recuperar dados do usuário', error)
    })
}

const ocultos = document.querySelectorAll('.input-oculto')
const cep = document.getElementById('cep')

const formEndereco = document.querySelector('.form-endereco')
const formCadastro = document.querySelector('.cadastro')
const formProximo = document.querySelector('.form-proximo')
const formAnterior = document.querySelector('.form-anterior')
const senha1 = document.getElementById('senha')
const senha2 = document.getElementById('senha2')
const senhaFeedback = document.querySelectorAll('.feedback-senha')
const senhaFeedback2 = document.querySelectorAll('.feedback-senha2')
const parteAtual = formCadastro.querySelectorAll('.form-control')

const botaoSubmit = document.getElementById('enviar-cadastro')

const dadosUsuario = document.getElementById('dadosUsuario')
const pegarDados = document.getElementById('pegarDados')

function limparCampos() {
  parteAtual.forEach((campo) => {
    campo.classList.remove('is-invalid', 'is-valid')
  })

  senha1.classList.remove('is-invalid')
  senha2.classList.remove('is-invalid')
  senha1.classList.remove('is-valid')
  senha2.classList.remove('is-valid')
  senhaFeedback.forEach((campo) => (campo.style.display = 'none'))
  senhaFeedback2.forEach((campo) => (campo.style.display = 'none'))

  cep.classList.remove('is-invalid', 'is-valid')
  cep.value = ''

  formEndereco.style.display = 'none'
  formCadastro.style.display = 'grid'
  botaoSubmit.style.display = 'none'

  formAnterior.disabled = true
  formProximo.disabled = false

  formEndereco.style.gridTemplateColumns = '1fr'

  ocultos.forEach((campos) => (campos.style.display = 'none'))
}

$('.modal').on('click', function (e) {
  if (e.target === this) {
    limparCampos()
  }
})

$('.modal button.btn-close').on('click', function () {
  limparCampos()
})

if (dadosUsuario) {
  pegarDados.addEventListener('click', buscarDados)
  dadosUsuario.addEventListener('click', buscarDados)
}
