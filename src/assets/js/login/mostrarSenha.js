export default function mostrarSenha() {
  const btnMostrarSenha = document.querySelectorAll('.btn-senha')
  const inputs = document.querySelectorAll('#senha, #senha2, #senha-entrar')

  function alternarTipo(input) {
    input.type = input.type === 'password' ? 'text' : 'password'
  }

  function atualizarClassesBotoes() {
    const senhaEhVisivel = inputs[0].type === 'text'
    btnMostrarSenha.forEach((botao) => {
      if (senhaEhVisivel) {
        botao.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
      } else {
        botao.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
      }
    })
  }

  btnMostrarSenha.forEach((botao) => {
    botao.addEventListener('click', () => {
      inputs.forEach(alternarTipo)
      atualizarClassesBotoes()
    })
  })
}
