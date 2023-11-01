create table usuario (
  id serial primary key,
  nome varchar(60) not null,
  nascimento date not null,
  sexo varchar(10) not null,
  nome_materno varchar(60) not null,
  cpf varchar(14) not null,
  celular varchar(19) not null,
  fixo varchar(18) not null,
  login varchar(6) unique not null,
  senha text not null,
  criado_em timestamptz default now()
);

create table endereco (
  id serial primary key,
  cep varchar(10) not null,
  uf varchar(2) not null,
  bairro varchar(255) not null,
  localidade varchar(255) not null,
  logradouro varchar(255) not null,
  complemento varchar(20),
  complemento_adicional varchar(40),
  criado_em timestamptz default now()
);

create table usuario_endereco (
  id serial primary key,
  usuario_id int references usuario(id),
  endereco_id int references endereco(id),
  criado_em timestamptz default now()
);

insert into usuario (nome, nascimento, sexo, nome_materno, cpf, celular, fixo, login, senha)
values ('', '1900-01-01', '', '', '', '', '', 'Teste', '$2b$10$VsIGKVAjZHb6oWSZ3.0tOOsWyUA1VKopmHA4EeQOqLurJNfzpJd0a');
