const modo = document.querySelector('#dark')

modo.addEventListener('change', function () {
  document.body.classList.toggle('dark-mode')
})