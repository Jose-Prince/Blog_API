const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog',
  password: 'JAPM102003',
  port: 5433, // Puerto correspondiente al contenedor Docker
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
