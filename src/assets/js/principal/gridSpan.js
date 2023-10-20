export default function grid() {
  const containers = document.querySelectorAll('.container-conteudo')

  containers.forEach((container) => {
    const divs = container.querySelectorAll('div')

    if (divs) {
      if (divs.length % 2 === 1) {
        const ultimaDiv = divs[divs.length - 1]
        ultimaDiv.style.gridColumn = '1 / -1'
      }
    }
  })
}