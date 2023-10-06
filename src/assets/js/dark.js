export default function dark() {
  const modo = document.querySelector('#dark')
  const logoMenu = document.querySelector('#logo-menu')
  const logoLogin = document.querySelector('#logo-login')
  const facebookIcon = document.querySelector('#facebook-icone')
  const instagramIcon = document.querySelector('#instagram-icone')
  const linkedinIcon = document.querySelector('#linkedin-icone')

  function verificarModo() {
    if (document.body.classList.contains('dark-mode')) {
      if (facebookIcon && instagramIcon && linkedinIcon) {
        facebookIcon.src = '/img/facebook-dark.svg'
        instagramIcon.src = '/img/instagram-dark.svg'
        linkedinIcon.src = '/img/linkedin-dark.svg'
      }

      if (logoMenu) {
        logoMenu.src = '/img/telecall-logo-header-red.svg'
      }

      if (logoLogin) {
        logoLogin.src = '/img/telecall-logo-dark.svg'
      }
      localStorage.setItem('dark', 1)
      return
    }

    if (logoMenu) {
      logoMenu.src = '/img/telecall-logo-header-blue.svg'
    }

    if (logoLogin) {
      logoLogin.src = '/img/telecall-logo.svg'
    }

    if (facebookIcon && instagramIcon && linkedinIcon) {
      facebookIcon.src = '/img/facebook.svg'
      instagramIcon.src = '/img/instagram.svg'
      linkedinIcon.src = '/img/linkedin.svg'
    }
  }

  function carregarTema() {
    const darkMode = localStorage.getItem('dark')

    verificarModo()

    if (darkMode) {
      document.body.classList.toggle('dark-mode')

      if (logoMenu) {
        logoMenu.src = '/img/telecall-logo-header-red.svg'
      }

      if (logoLogin) {
        logoLogin.src = '/img/telecall-logo-dark.svg'
      }

      if (facebookIcon && instagramIcon && linkedinIcon) {
        facebookIcon.src = '/img/facebook-dark.svg'
        instagramIcon.src = '/img/instagram-dark.svg'
        linkedinIcon.src = '/img/linkedin-dark.svg'
      }
    }
  }

  carregarTema()

  modo.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode')

    localStorage.removeItem('dark')

    verificarModo()
  })
}
