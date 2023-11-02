export default function sessaoExpirada() {
  const erroLogin = document.getElementById('erroLogin')

  function apagarCookies() {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const nome = cookie.split('=')[0]
      document.cookie = nome + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
    }
  }

  function obterCookie(name) {
    const cookie = document.cookie.split(';').find((cookie) => cookie.startsWith(name + '='))

    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
  }

  const sessao_expirada = obterCookie('sessao_expirada')

  if (sessao_expirada) {
    erroLogin.style.display = 'block'
    erroLogin.innerText = sessao_expirada

    if (erroLogin.style.display === 'block') {
      apagarCookies()
    }
  }
}
