// Criar a função de erro
const erro = (status, mensagem) => {
  const erro = new Error(mensagem)
  erro.status = status
  throw erro
}

// Exportar a função de erro usando a sintaxe de exportação ES6
export default erro
