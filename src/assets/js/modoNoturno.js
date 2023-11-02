export default function modoNoturno() {
  const modo = document.querySelector('#dark')
  const bgIndex = document.querySelector('.fundo-index')
  const bgLogin = document.querySelector('.fundo-login')

  const logoMenu = document.querySelector('#logo-menu')
  const logoLogin = document.querySelector('#logo-login')
  const facebookIcon = document.querySelector('#facebook-icone')
  const instagramIcon = document.querySelector('#instagram-icone')
  const linkedinIcon = document.querySelector('#linkedin-icone')
  const seta = document.querySelector('#seta-topo')

  const modoClaro = {
    bgIndex: '/img/index.jpg',
    bgLogin: '/img/login.webp',
    facebookIcon: '/img/facebook.svg',
    instagramIcon: '/img/instagram.svg',
    linkedinIcon: '/img/linkedin.svg',
    logoMenu: '/img/telecall-logo-header-blue.svg',
    logoLogin: '/img/telecall-logo.svg',
    seta: '/img/back-top.svg',
  }

  const modoEscuro = {
    bgIndex: '/img/index-dark.webp',
    bgLogin: '/img/login-dark.png',
    facebookIcon: '/img/facebook-dark.svg',
    instagramIcon: '/img/instagram-dark.svg',
    linkedinIcon: '/img/linkedin-dark.svg',
    logoMenu: '/img/telecall-logo-header-red.svg',
    logoLogin: '/img/telecall-logo-dark.svg',
    seta: '/img/back-top-dark.svg',
  }

  function verificarModo() {
    const modoAtual = document.body.classList.contains('dark-mode') ? modoEscuro : modoClaro

    if (bgIndex) {
      bgIndex.style.backgroundImage = `url(${modoAtual.bgIndex})`
    }
    if (bgLogin) {
      bgLogin.style.backgroundImage = `url(${modoAtual.bgLogin})`
    }

    if (facebookIcon && instagramIcon && linkedinIcon) {
      facebookIcon.src = modoAtual.facebookIcon
      instagramIcon.src = modoAtual.instagramIcon
      linkedinIcon.src = modoAtual.linkedinIcon
    }

    if (logoMenu) {
      logoMenu.src = modoAtual.logoMenu
    }

    if (logoLogin) {
      logoLogin.src = modoAtual.logoLogin
    }

    if (seta) {
      seta.src = modoAtual.seta
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
