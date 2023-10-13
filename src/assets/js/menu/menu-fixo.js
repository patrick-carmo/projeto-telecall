export default function menuFixo() {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header')
    const back = document.querySelector('#back-top')
    const screenWidth = window.innerWidth || document.documentElement.clientWidth
    if (window.scrollY > 100) {
      header.classList.add('menu-fixo')

      if (screenWidth >= 600) {
        back.style.display = 'block'
        back.addEventListener('click', () => {
          window.scrollTo(0, 0)
        })
        return
      }
      
      back.style.display = 'none'
      return
    }

    header.classList.remove('menu-fixo')
  })
}
