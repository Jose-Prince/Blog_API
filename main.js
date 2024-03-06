const express = require('express');
const cors = require('cors');
const queries = require('./db');

const app = express();
const port = 3000;

// Configuración de CORS
app.use(cors());

// Configuración de Express para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// Ruta para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await queries.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  try {
    const post = await queries.getPost(postId)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({error: 'Post no encontrado'})
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// Ruta para crear un nuevo post
app.post('/posts', async (req, res) => {
  const { id, name, date } = req.body;
  try {
    await queries.createPost(id, name, date);

    const newPost = await queries.getPost(id)

    res.status(200).json({ message: 'Post creado exitosamente', post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const newContent = req.body.newContent; // Se debe acceder al nuevo contenido desde el cuerpo de la solicitud

    await queries.modifyContent(postId, newContent);

    const post = await queries.getPost(postId)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({error: 'Post no encontrado'})
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId

    await queries.deletePost(postId)

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});