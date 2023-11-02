export default function scroll() {
  window.addEventListener('load', function () {
    if (window.location.hash) {
      const id = window.location.hash
      const $elemento = $(id)

      if ($elemento.length) {
        const scroll = $elemento.offset().top - 80
        $('html, body').animate(
          {
            scrollTop: scroll,
          },
          200
        )
      }
    }
  })
}
