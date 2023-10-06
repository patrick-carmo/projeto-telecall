import { realizarSolicitacao } from '../axios.js'

export async function autenticarUsuario(login, senha) {
  const loginData = {
    login,
    senha,
  }
  try {
    await realizarSolicitacao('/autenticar', loginData)
  } catch (error) {
    throw error
  }
}

export function botaoTeste() {
  const loginTeste = document.getElementById('login-teste')

  loginTeste.addEventListener('click', async function (e) {
    e.preventDefault()

    const login = 'Teste'
    const senha = 'X9!jPq#5LzR$'

    try {
      await autenticarUsuario(login, senha)
      window.location.href = '/'
    } catch (error) {
      console.error(error.response.data.mensagem)
    }
  })
}

export function verificarLogin() {
  const loginForm = document.getElementById('login-form')

  const erroLogin = document.getElementById('erroLogin')
  const login = document.getElementById('login-entrar')
  const senha = document.getElementById('senha-entrar')

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault()

    senha.classList.remove('is-invalid')
    login.classList.remove('is-invalid')

    const loginValue = login.value
    const senhaValue = senha.value
    try {
      await autenticarUsuario(loginValue, senhaValue)

      erroLogin.style.display = 'none'
      erroLogin.innerText = ''

      window.location.href = '/'
    } catch (error) {
      erroLogin.style.display = 'block'
      erroLogin.textContent = error.response.data.mensagem

      login.classList.add('is-invalid')
      senha.classList.add('is-invalid')

      setTimeout(() => {
        login.classList.remove('is-invalid')
        senha.classList.remove('is-invalid')
      }, 10000)

      console.error(error.response.data.mensagem)
    }
  })
}
