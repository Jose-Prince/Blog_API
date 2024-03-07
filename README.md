# Blog_API

Esta es una API para un blog simple que permite crear, leer, actualizar y eliminar publicaciones.

## Intalación

1. Clona el repositorio usando:

```bash
git clone https://github.com/tu-usuario/blog-api.git
```
2. Instala las dependencias utilizando npm en la carpeta raíz del proyecto:

```bash
npm install
```
3. Configura la base de datos PostgreSQL y asegurarse de que la configuración de conexión esté actualizada en el archivo `connection.js`.

4. inicia el servidor:

```bash
npm start
```

La API estará disponible en `http://localhost:3000`.

## Uso

La API proporciona los siguientes endpoints:

- `GET /posts`: Obtiene todas las publicaciones.
- `GET /posts/:postId`: Obtiene una publicación específica por su ID.
- `POST /posts`: Crea una nueva publicación.

Formato de body:

- `PUT /posts/:postId`: Actualiza el contenido de una publicación existente.\n

Formato de body:

- `DELETE /posts/:postId`: Elimina una publicación exitente.

Formato de body:

## Contribuciones
Las contribuciones son bienvenidas. Si encuentras un error o tienes una sugerencia de mejora, por favor crea una issue o envía un pull request.
