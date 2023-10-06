export async function realizarSolicitacao(url, dados) {
  try {
    const response = await axios.post(url, dados)
    return response
  } catch (error) {
    throw error
  }
}