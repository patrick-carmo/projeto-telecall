const intermediario = {
  verificarAutenticacao: (req, res, next) => {
    if (req.session.usuarioLogado) {
      return next()
    }

    res.redirect('/login.html')
  },
}

module.exports = intermediario