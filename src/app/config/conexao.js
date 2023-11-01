import knex from 'knex'
import dotenv from 'dotenv'
dotenv.config()

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URL,
})

export default db
