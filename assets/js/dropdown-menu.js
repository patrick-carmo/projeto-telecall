const menu = document.querySelectorAll('[data-dropdown]')

menu.forEach((menu) => {
  ['touchstart', 'click'].forEach((userEvent) => {
    menu.addEventListener(userEvent, handleClick)
  })
})

function handleClick() {
  this.classList.add('active')
  outsideClick(this,['touchstart', 'click'], () => {
    this.classList.remove('active')
  })
}

function outsideClick(element, events, callback) {
  const html = document.documentElement
  const outside = 'data-outside'

  if (!element.hasAttribute(outside)) {
    events.forEach(userEvent=>{
      html.addEventListener(userEvent, handleOutsideClick)
    })
    html.addEventListener('click', handleOutsideClick)
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
