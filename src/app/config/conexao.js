const { Pool } = require('pg')

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + '?sslmode=require',
// })

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'telecall',
  password: '0000',
  port: 5432,
})

module.exports = pool