export default document.addEventListener('DOMContentLoaded', function () {
  const loginTeste = document.getElementById('login-Teste')

  loginTeste.addEventListener('click', function () {
    const formulario = document.querySelector('.form-login')

    formulario.querySelector('#login-entrar').value = 'Teste'
    formulario.querySelector('#senha-entrar').value = 'X9!jPq#5LzR$'

    formulario.submit()
  })
})