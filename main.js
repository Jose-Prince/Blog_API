const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const queries = require('./db')

const app = express()
const port = 3000

// Configuración de CORS
app.use(cors())

// Configuración de Express para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json())

app.use((req, res, next) => {
  const timestamp = new Date().toISOString()

  const logMessage = `${timestamp}: ${req.method} ${req.originalUrl} - Payload: 
  ${JSON.stringify(req.body)} - Response: ${res.statusCode}\n`

  fs.appendFile(path.join(__dirname, 'log.txt'), logMessage, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  })
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Ruta para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await queries.getAllPosts()
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

app.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  try {
    const post = await queries.getPost(postId)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ error: 'Post no encontrado' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// Ruta para crear un nuevo post
app.post('/posts', async (req, res) => {
  const {
    name, date, content, archive,
  } = req.body
  if (!name || !date || !content || !archive) {
    res.status(400).json({ error: 'Datos incompletos en el cuerpo de la solicitud' })
  } else {
    await queries.createPost(name, date, content, archive)
    res.status(200).json({ message: 'Post creado exitosamente' }) // Aquí se ha corregido para devolver solo el mensaje
  }
})

app.put('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  const { newContent } = req.body
  if (!newContent) {
    res.status(400).json({ error: 'Datos incompletos en el cuerpo de la solicitud' })
  } else {
    try {
      await queries.modifyContent(postId, newContent)
      const post = await queries.getPost(postId)
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ error: 'Post no encontrado' })
      }
    } catch (err) {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
})

app.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  try {
    await queries.deletePost(postId)
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

// Middleware para manejar endpoints no existentes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' })
})

// Middleware para manejar errores de formato incorrecto en el cuerpo de la solicitud
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Formato incorrecto en el cuerpo de la solicitud' })
  } else {
    next()
  }
})

// Middleware para manejar métodos HTTP no implementados
app.use((req, res) => {
  res.status(501).json({ error: 'Método HTTP no implementado' })
})

// Iniciar el servidor
app.listen(port, () => {
})
