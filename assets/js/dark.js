const modo = document.querySelector('#dark')
const logoLight = document.querySelector("#logo-light")
const logoDark = document.querySelector('#logo-dark')

modo.addEventListener('change', function () {
  document.body.classList.toggle('dark-mode')
  if(modo.checked){
    logoLight.style.display = 'none'
    logoDark.style.display = 'inline-block'
  }
  else{
    logoLight.style.display = 'inline-block'
    logoDark.style.display = 'none'
  }
})