import render from '../util/render.js'

const controle = {
  index: (req, res) => {
    render(req, res, 'index')
  },

  login: (req, res) => {
    render(req, res, 'login')
  },

  internet: (req, res) => {
    render(req, res, 'internet')
  },

  telefonia: (req, res) => {
    render(req, res, 'telefonia')
  },

  redeInfraestrutura: (req, res) => {
    render(req, res, 'rede-e-infraestrutura')
  },
}

export default controle
