const menu = document.querySelectorAll('[data-dropdown]')

menu.forEach((menu) => {
  ;['touchstart', 'click'].forEach((userEvent) => {
    menu.addEventListener(userEvent, handleClick)
  })
})

function handleClick() {
  this.classList.add('active')
  outsideClick(this, ['touch', 'click'], () => {
    this.classList.remove('active')
  })
}

function outsideClick(element, events, callback) {
  const html = document.documentElement
  const outside = 'data-outside'

  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) => {
      setTimeout(() => {
        html.addEventListener(userEvent, handleOutsideClick)
      })
    })
    element.setAttribute(outside, '')
  }

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside)
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick)
      })
      callback()
    }
  }
}

const menuButton = document.querySelector('[data-menu="button"]')
const menuList = document.querySelector('[data-menu="list"]')
const eventos = ['click', 'touch']

if (menuButton) {
  function openMenu(event) {
    menuList.classList.add('active')
    menuButton.classList.add('active')
    outsideClick(menuList, eventos, () => {
      menuList.classList.remove('active')
      menuButton.classList.remove('active')
    })
  }
  eventos.forEach((evento) => menuButton.addEventListener(evento, openMenu))
}