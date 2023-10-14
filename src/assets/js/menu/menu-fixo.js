export default function menuFixo() {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header')
    const back = document.querySelector('#back-top')
    const screenWidth = window.innerWidth || document.documentElement.clientWidth
    const menuList = document.querySelector("[data-menu='list']")

    if (window.scrollY >= 0 && window.scrollY <= 100) {
      menuList.style.paddingTop = '90px'
      header.classList.remove('menu-fixo')
    }
    if (window.scrollY > 100) {
      header.classList.add('menu-fixo')
      menuList.style.paddingTop = ''

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
}
