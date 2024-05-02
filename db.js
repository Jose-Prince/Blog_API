const conn = require('./connection')

const getAllPosts = async () => {
  try {
    const result = await conn.query(
      `SELECT * FROM Movies`,
    )
    return result.rows
  } catch (err) {
    throw new Error('Error interno del servidor')
  }
}

const getAdmin = async () => {
  try {
    const result = await conn.query(
      `SELECT * FROM admin`
    )
    return result.rows[0]
  } catch (err) {
    throw new Error('Error interno del servidor')
  }
}

const getPost = async (postId) => {
  try {
    const result = await conn.query(`SELECT id, title, trailer, image, music, content FROM Movies
        WHERE id = $1
    `, [postId])
    return result.rows[0]
  } catch (err) {
    throw new Error('Error interno del servidor')
  }
}

const modifyPost = async (postId, title, trailer, image, music, content) => {
  try {
    const result = await conn.query(`UPDATE movies 
      SET title = $1,
      trailer = $2,
      image = $3,
      music = $4,
      content = $5
      WHERE id = $6
    `, [title, trailer, image, music, content, postId])
    return result.rows[0]
  } catch (err) {
    throw new Error('Error interno del servidor')
  }
}

const deletePost = async (postId) => {
  try {
    await conn.query('BEGIN') // Iniciar la transacción

    // Ejecutar los comandos de eliminación por separado
    await conn.query('DELETE FROM Movies WHERE id = $1', [postId])

    await conn.query('COMMIT') // Confirmar la transacción
  } catch (err) {
    await conn.query('ROLLBACK') // Revertir la transacción en caso de error
    throw new Error('Error interno del servidor')
  }
}

const createPost = async (title, trailer, image, content) => {
  try {
    // Insertar primero en la tabla Post para obtener el ID generado automáticamente
    await conn.query('INSERT INTO Movies (title, trailer, image, content) VALUES ($1, $2, $3, $4)', [title, trailer, image, content])
  } catch (err) {
    throw new Error('Error al crear un nuevo post')
  }
}

const createPeople = async (name, role, id, picture) => {
  try {
    await conn.query(`
      INSERT INTO People ( name, role, id, picture)
      VALUES ($1,$2,$3, $4)
    `, [name, role, id, picture])
  } catch (err) {
    throw new Error('Error al añadir una persona')
  }
}

const getPeopleMovie = async (id) => {
  try {
    const result = await conn.query(
      `SELECT name, role, picture FROM people
      WHERE id = $1`, [id]
    )
    return result.rows
  } catch (err) {
    throw new Error('Error interno del servidor')
  }
}

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  modifyPost,
  deletePost,
  getAdmin,
  createPeople,
  getPeopleMovie,
}
