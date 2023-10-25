export default function render(req, res, pagina) {
  if (pagina === 'login') {
    return res.status(200).render(pagina, { paginaLogin: true })
  }

  return res.status(200).render(pagina, { paginaLogin: false, nomeOuLogin: req.nomeOuLogin })
}