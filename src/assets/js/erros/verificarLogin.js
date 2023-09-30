export default window.addEventListener('load', () => {
  const erro = document.getElementById('erroLogin')
  fetch('/obter_erro')
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        erro.textContent = data.error
        fetch('/limpar_erro', { method: 'GET' })
        erro.style.display = 'block'
      } else {
        erro.textContent = ''
        erro.style.display = 'none'
      }
    })
    .catch((error) => {
      console.error('Erro de rede', error)
    })
})