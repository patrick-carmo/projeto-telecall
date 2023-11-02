export default function acessibilidade() {
  const zoom = (operacao) => {
    let zoomValue = parseFloat(localStorage.getItem('zoomValue')) || 1.0

    operacao === '+' ? (zoomValue += 0.1) : (zoomValue -= 0.1)

    document.body.style.zoom = zoomValue
    localStorage.setItem('zoomValue', zoomValue)
  }

  function restaurarZoom() {
    document.body.style.zoom = 1.0
    localStorage.removeItem('zoomValue')
  }

  document.getElementById('original').addEventListener('click', restaurarZoom)
  document.getElementById('aumentar').addEventListener('click', () => zoom('+'))
  document.getElementById('diminuir').addEventListener('click', () => zoom())

  const savedZoom = parseFloat(localStorage.getItem('zoomValue'))

  if (!isNaN(savedZoom)) {
    document.body.style.zoom = savedZoom
  }
}
