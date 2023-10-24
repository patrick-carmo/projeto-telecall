// Definir as expressões regulares
const nome = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]{10,}$/
const login = /^[A-Za-z0-9]{5,}$/
const nomeMaterno = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]{10,}$/
const nascimento = /^(19\d{2}|200\d|2010)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
const cpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
const celular = /^\+\d{2}\s\(\d{2}\)\s\d{5}-\d{4}$/
const fixo = /^\+\d{2}\s\(\d{2}\)\s\d{4}-\d{4}$/
const cep = /^\d{5}-\d{3}$/
const complemento = /^(?![.,\s])[\wÀ-ÿ.,\s]*$/
const complementoAdicional = /^(?![.,\s])[\wÀ-ÿ.,\s]{0,}$/

const regex = {
  nome,
  login,
  nomeMaterno,
  nascimento,
  cpf,
  celular,
  fixo,
  cep,
  complemento,
  complementoAdicional,
}

export default regex
