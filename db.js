const conn = require('./connection')

const insertPost = async (name, date) => {
  try {
    await conn.query('INSERT INTO Post (name, date) VALUES ($1, $2)', [name, date])
  } catch (err) {
    throw new Error('Error interno del servidor')
  }
}

const insertContent = async (postId, content) => {
  try {
    await conn.query('INSERT INTO Content (id, text) VALUES ($1, $2)', [postId, content])
  } catch (err) {
    throw new Error('Error al insertar en la tabla Content')
  }
}

const insertDecoration = async (postId, archive) => {
  try {
    await conn.query('INSERT INTO Decoration (id, archive) VALUES ($1, $2)', [postId, archive])
  } catch (err) {
    throw new Error('Error al insertar en la tabla Decoration')
  }
}
const getAllPosts = async () => {
  try {
    const result = await conn.query(
      `SELECT Post.id, name, date, text, archive FROM Post
      JOIN content ON content.id = Post.id
      JOIN decoration ON decoration.id = Post.id`,
    )
    return result.rows
  } catch (err) {
    throw new Error('Error interno del servidor')
  }
}

const getPost = async (postId) => {
  try {
    const result = await conn.query(`SELECT Post.id, name, date, text, archive FROM Post
        JOIN content ON content.id = Post.id
        JOIN decoration ON decoration.id = Post.id
        WHERE post.id = $1
    `, [postId])
    return result.rows[0]
  } catch (err) {
    throw new Error('Error interno del servidor')
  }
}

const modifyContent = async (postId, newContent) => {
  try {
    const result = await conn.query(`UPDATE content 
    SET text = $2
    WHERE id = $1
    `, [postId, newContent])
    return result.rows[0]
  } catch (err) {
    throw new Error('Error interno del servidor')
  }
}

const deletePost = async (postId) => {
  try {
    await conn.query('BEGIN') // Iniciar la transacción

    // Ejecutar los comandos de eliminación por separado
    await conn.query('DELETE FROM content WHERE id = $1', [postId])
    await conn.query('DELETE FROM decoration WHERE id = $1', [postId])
    await conn.query('DELETE FROM post WHERE id = $1', [postId])

    await conn.query('COMMIT') // Confirmar la transacción
  } catch (err) {
    await conn.query('ROLLBACK') // Revertir la transacción en caso de error
    throw new Error('Error interno del servidor')
  }
}

const createPost = async (name, date, content, archive) => {
  try {
    // Insertar primero en la tabla Post para obtener el ID generado automáticamente
    await insertPost(name, date)
    // Obtener el ID del último post insertado
    const { rows } = await conn.query('SELECT id FROM Post ORDER BY id DESC LIMIT 1')
    const postId = rows[0].id
    // Insertar en las tablas Content y Decoration utilizando el ID obtenido anteriormente
    await insertContent(postId, content)
    await insertDecoration(postId, archive)
  } catch (err) {
    throw new Error('Error al crear un nuevo post')
  }
}

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  modifyContent,
  deletePost,
}
