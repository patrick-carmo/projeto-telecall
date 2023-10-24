const erro = (status, mensagem) => {
  const erro = new Error(mensagem)
  erro.status = status
  throw erro
}

export default erro
