export default function dark() {
  const modo = document.querySelector('#dark')
  const logoLight = document.querySelector('#logo-light')
  const logoDark = document.querySelector('#logo-dark')

  function verificarModo() {
    if (document.body.classList.contains('dark-mode')) {
      logoLight.style.display = 'none'
      logoDark.style.display = 'inline-block'

      localStorage.setItem('dark', 1)
      return
    }

    logoLight.style.display = 'inline-block'
    logoDark.style.display = 'none'
  }

  function carregarTema() {
    const darkMode = localStorage.getItem('dark')

    verificarModo()

    if (darkMode) {
      document.body.classList.toggle('dark-mode')

      logoLight.style.display = 'none'
      logoDark.style.display = 'inline-block'
    }
  }

  carregarTema()

  modo.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode')

    localStorage.removeItem('dark')

    verificarModo()
  })
}
