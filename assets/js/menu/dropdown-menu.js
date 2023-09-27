import outsideClick from './click.js'

export default function dropdown() {
  const menu = document.querySelectorAll('[data-dropdown]')

  menu.forEach((menu) => {
    ;['touch', 'click'].forEach((userEvent) => {
      menu.addEventListener(userEvent, handleClick)
    })
  })

  function handleClick() {
    this.classList.add('active')
    outsideClick(this, ['touch', 'click'], () => {
      this.classList.remove('active')
    })
  }
}
