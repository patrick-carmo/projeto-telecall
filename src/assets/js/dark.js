export default function dark() {
  const modo = document.querySelector('#dark')
  const logoMenu = document.querySelector('#logo-menu')
  const logoLogin = document.querySelector('#logo-login')
  const facebookIcon = document.querySelector('#facebook-icone')
  const instagramIcon = document.querySelector('#instagram-icone')
  const linkedinIcon = document.querySelector('#linkedin-icone')
  const seta = document.querySelector('#seta-topo')

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

      if (seta) {
        seta.src = '/img/back-top-dark.svg'
      }
    }
  }

  function carregarTema() {
    const configuracoesSalvas = JSON.parse(localStorage.getItem('configuracoesUsuario')) || {}
    if (configuracoesSalvas.modoEscuro) {
      document.body.classList.add('dark-mode')
      verificarModo()
    }
  }

  function salvarConfiguracoes(configuracoes) {
    localStorage.setItem('configuracoesUsuario', JSON.stringify(configuracoes))
  }

  carregarTema()

  modo.addEventListener('change', function () {
    const configuracoesUsuario = {
      ...(JSON.parse(localStorage.getItem('configuracoesUsuario')) || {}),
      modoEscuro: !document.body.classList.contains('dark-mode'),
    }

    salvarConfiguracoes(configuracoesUsuario)
    document.body.classList.toggle('dark-mode')
    verificarModo()
  })
}
