const conn = require('./connection');

const getAllPosts = async () => {
  try {
    const result = await conn.query(
        `SELECT Post.id, name, date, text, archive FROM Post
        join content on content.id = Post.id
        join decoration on decoration.id = Post.id
    `
        );
    return result.rows;
  } catch (err) {
    console.error('Error al obtener los posts:', err);
    throw new Error('Error interno del servidor');
  }
};

const getPost = async (postId) => {
  try {
    // Realiza la consulta SQL utilizando el ID proporcionado
    const result = await conn.query(`SELECT Post.id, name, date, text, archive FROM Post
        join content on content.id = Post.id
        join decoration on decoration.id = Post.id
        where post.id = $1
    `, [postId]);
    return result.rows[0];
  } catch (err) {
    console.error('Error al obtener los posts:', err);
    throw new Error('Error interno del servidor');
  }
}

const modifyContent = async (postId, newContent) => {
  try {
    const result = await conn.query(`update content 
    set text = $2
    where id = $1
    `, [postId, newContent])
    return result.rows[0]
  } catch (err) {
    console.error('Error al obtener los posts:', err);
    throw new Error('Error interno del servidor');
  }
}

const deletePost = async (postId) => {
  try {
    await conn.query('BEGIN'); // Iniciar la transacción

    // Ejecutar los comandos de eliminación por separado
    await conn.query('DELETE FROM content WHERE id = $1', [postId])
    await conn.query('DELETE FROM decoration WHERE id = $1', [postId])
    await conn.query('DELETE FROM post WHERE id = $1', [postId])

    await conn.query('COMMIT') // Confirmar la transacción
  } catch (err) {
    await conn.query('ROLLBACK') // Revertir la transacción en caso de error
    console.error('Error al eliminar el post:', err)
    throw new Error('Error interno del servidor')
  } 
}

const createPost = async (id, name, date) => {
  try {
    await insertPost(id, name, date);
    await insertContent(id, name);
    await insertDecoration(id, name);
  } catch (err) {
    console.error('Error al crear el post:', err);
    throw new Error('Error interno del servidor');
  }
};

const insertPost = async (id, name, date) => {
  try {
    await conn.query(`INSERT INTO Post (id, name, date) VALUES ($1, $2, $3)`, [id, name, date]);
  } catch (err) {
    console.error('Error al insertar en la tabla Post:', err);
    throw new Error('Error interno del servidor');
  }
};

const insertContent = async (id, name) => {
  try {
    await conn.query(`INSERT INTO Content (id, text) VALUES ($1, $2)`, [id, name]);
  } catch (err) {
    console.error('Error al insertar en la tabla Content:', err);
    throw new Error('Error interno del servidor');
  }
};

const insertDecoration = async (id, name) => {
  try {
    await conn.query(`INSERT INTO Decoration (id, archive) VALUES ($1,$2)`, [id,name]);
  } catch (err) {
    console.error('Error al insertar en la tabla Decoration:', err);
    throw new Error('Error interno del servidor');
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  modifyContent,
  deletePost
};