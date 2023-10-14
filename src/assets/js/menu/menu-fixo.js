export default function menuFixo() {
  const menuList = document.querySelector("[data-menu='list']")
  const back = document.querySelector('#back-top')

  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header')
    const screenWidth = window.innerWidth || document.documentElement.clientWidth

    if (window.scrollY <= 100) {
      menuList.style.paddingTop = ''
      header.classList.remove('menu-fixo')
    }
    if (window.scrollY > 100) {
      if (screenWidth <= 1000) {
        menuList.style.paddingTop = '60px'
      }
      header.classList.add('menu-fixo')
      if (screenWidth >= 600) {
        back.style.display = 'block'
        back.addEventListener('click', () => {
          window.scrollTo(0, 0)
        })

        return
      }
    }
    back.style.display = 'none'
  })

  function atualizarPaddingTop() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth
    if (screenWidth > 1000 || window.screenY <= 100) {
      menuList.style.paddingTop = ''
    }
    if (screenWidth <= 1000 && window.scrollY > 100) {
      menuList.style.paddingTop = '60px'
    }

    if(screenWidth < 600) {
      back.style.display = 'none'
    }
  }

  atualizarPaddingTop()
  window.addEventListener('resize', atualizarPaddingTop)
}
