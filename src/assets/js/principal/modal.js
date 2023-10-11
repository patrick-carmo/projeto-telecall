import cadastro from '../login/cadastro.js'
cadastro()

function buscarDados() {
  axios
    .get('/dados')
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
        if(id === 'nascimento') {
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

const dadosUsuario = document.getElementById('dadosUsuario')
const pegarDados = document.getElementById('pegarDados')

pegarDados.addEventListener('click', buscarDados)
dadosUsuario.addEventListener('click', buscarDados)