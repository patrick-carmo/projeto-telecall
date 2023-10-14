export default function menuFixo() {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header')
    const back = document.querySelector('#back-top')
    if (window.scrollY > 100){
      header.classList.add('menu-fixo')
      back.style.display = 'block'

      back.addEventListener('click', () => {
        window.scrollTo(0, 0)
      })

      return
    }

    header.classList.remove('menu-fixo')
    back.style.display = 'none'
  })
}
