
import knex from 'knex'

const config = {
  client: 'pg',
  connection: process.env.POSTGRES_URL,
}

const db = knex(config)

export default db
