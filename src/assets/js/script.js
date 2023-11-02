import validarFormulario from './login/validarFormulario.js'
validarFormulario()

import modoEscuro from './modoNoturno.js'
modoEscuro()

import { botaoTeste, verificarLogin } from './requisicoes/requisicaoLogin.js'
botaoTeste()
verificarLogin()

import cadastrarOuAlterar from './requisicoes/cadastroOuAlteracao.js'
cadastrarOuAlterar()

import sessaoExpirada from './mensagensDeErro/sessaoExpirada.js'
sessaoExpirada()
