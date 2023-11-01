import Joi from 'joi'
import regex from '../util/regex.js'

const schemaUsuario = Joi.object({
  nome: Joi.string().trim().required().min(10).max(60).regex(regex.nome).messages({
    'string.pattern.base': 'O nome deve conter apenas letras',
    'string.empty': 'O nome é obrigatório',
    'any.required': 'O nome é obrigatório',
    'string.max': 'O nome deve conter no máximo 60 caracteres',
    'string.min': 'O nome deve conter no mínimo 10 caracteres',
  }),
  nascimento: Joi.date().iso().required().messages({
    'date.base': 'A data de nascimento é obrigatória',
    'any.required': 'A data de nascimento é obrigatória',
    'date.format': 'A data de nascimento é obrigatória',
  }),
  sexo: Joi.string().valid('Masculino', 'Feminino', 'Outro').required().messages({
    'any.only': 'O sexo deve ser Masculino, Feminino ou Outro',
    'any.required': 'O sexo é obrigatório',
  }),
  nomeMaterno: Joi.string().trim().required().regex(regex.nomeMaterno).messages({
    'string.pattern.base': 'O nome deve conter apenas letras',
    'string.empty': 'O nome materno é obrigatório',
    'any.required': 'O nome materno é obrigatório',
    'string.max': 'O nome deve conter no máximo 60 caracteres',
    'string.min': 'O nome deve conter no mínimo 10 caracteres',
  }),
  cpf: Joi.string().trim().required().regex(regex.cpf).messages({
    'string.pattern.base': 'O CPF deve conter apenas números',
    'string.empty': 'O CPF é obrigatório',
    'any.required': 'O CPF é obrigatório',
  }),
  celular: Joi.string().trim().required().regex(regex.celular).messages({
    'string.pattern.base': 'O celular deve conter apenas números',
    'string.empty': 'O celular é obrigatório',
    'any.required': 'O celular é obrigatório',
  }),
  fixo: Joi.string().trim().required().regex(regex.fixo).messages({
    'string.pattern.base': 'O telefone fixo deve conter apenas números',
    'string.empty': 'O telefone fixo é obrigatório',
    'any.required': 'O telefone fixo é obrigatório',
  }),
  login: Joi.string().trim().required().min(5).max(6).regex(regex.login).messages({
    'string.pattern.base': 'O login deve conter apenas letras e números',
    'string.empty': 'O login é obrigatório',
    'any.required': 'O login é obrigatório',
    'string.max': 'O login deve conter no máximo 6 caracteres',
    'string.min': 'O login deve conter no mínimo 5 caracteres',
  }),
  senha: Joi.string().trim().required().messages({
    'string.empty': 'A senha é obrigatória',
    'any.required': 'A senha é obrigatória',
  }),
  cep: Joi.string().trim().required().regex(regex.cep).messages({
    'string.pattern.base': 'O CEP deve conter apenas números',
    'string.empty': 'O CEP é obrigatório',
    'any.required': 'O CEP é obrigatório',
  }),
  uf: Joi.string().trim().required().messages({
    'string.empty': 'O estado é obrigatório',
    'any.required': 'O estado é obrigatório',
  }),
  bairro: Joi.string().trim().required().messages({
    'string.empty': 'O bairro é obrigatório',
    'any.required': 'O bairro é obrigatório',
  }),
  localidade: Joi.string().trim().required().messages({
    'string.empty': 'A cidade é obrigatória',
    'any.required': 'A cidade é obrigatória',
  }),
  logradouro: Joi.string().trim().required().messages({
    'string.empty': 'O logradouro é obrigatório',
    'any.required': 'O logradouro é obrigatório',
  }),
  complemento: Joi.string().trim().regex(regex.complemento).required().messages({
    'string.pattern.base': 'O número deve conter apenas letras e números',
    'string.empty': 'O número é obrigatório',
    'any.required': 'O número é obrigatório',
  }),
  complementoAdicional: Joi.string().trim().allow('').regex(regex.complementoAdicional).messages({
    'string.pattern.base': 'O complemento deve conter apenas letras e números',
  }),
})

export default schemaUsuario