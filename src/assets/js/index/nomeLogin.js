export default document.addEventListener('DOMContentLoaded', function () {
  fetch('/nome')
    .then((response) => response.json())
    .then((data) => {
      if (data.autenticado) {
        const nome = document.getElementById('nomeLogin')

        if (data.nomeDoUsuario === 'Teste') {
          nome.innerHTML = `<span style='border-bottom: 2px solid var(--cor-header-after); border-radius: 5px'>${data.nomeDoUsuario}!</span>`
        } else {
          nome.innerHTML = `Olá, <span style='border-bottom: 2px solid var(--cor-header-after); border-radius: 5px'>${data.nomeDoUsuario}!</span>`
        }
      }
    })
    .catch((error) => {
      console.error('Erro ao obter dados da sessão', error)
    })
})
