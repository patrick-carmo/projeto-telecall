;(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      },
      false
    )
  })
})()

  const limpar = document.querySelector('.botao-limpar')

  limpar.addEventListener('click', function () {
    const formCadastro = document.querySelector('.cadastro')
    const campos = formCadastro.querySelectorAll('.form-control')

    campos.forEach((campo) => {
      campo.value = ''
      campo.classList.remove('is-invalid')
    })
    formCadastro.classList.remove('was-validated')
  })

