const path = require('path')

const controle = {
  paginaPrincipal: (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'app', 'views', 'principal.html'))
  },
}
module.exports = controle
