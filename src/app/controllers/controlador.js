const path = require('path')

const controle = {
  paginaPrincipal: (req, res) => {
    res.sendFile(path.join(__dirname, 'principal.html'))
  },
}
module.exports = controle
