# Proyecto: API REST de Superhéroes

## Descripción
Este proyecto es una API REST construida con **Node.js**, **Express** y **MongoDB** (Mongoose), que permite gestionar un catálogo de superhéroes. Incluye una interfaz de usuario basada en **EJS** para operaciones CRUD (Crear, Leer, Actualizar, Eliminar), validaciones con **express-validator**, manejo de vistas con **express-ejs-layouts** y uso de **method-override** para soportar métodos PUT y DELETE desde formularios HTML.

---

## Características principales

- **CRUD completo** de superhéroes:
  - Listado paginado y buscador por nombre, planeta de origen o nombre real.
  - Formularios de agregar y editar con validaciones.
  - Eliminación por ID o por nombre.
- **API JSON**:
  - Respuestas estructuradas en JSON para consumo de clientes externos.
  - Gestión de errores con códigos HTTP adecuados (200, 201, 400, 404, 500).
- **Interfaz web**:
  - Vistas EJS con diseño responsivo (Tailwind CSS).
  - Diseño de layout reutilizable para todas las páginas.
  - Componentes parciales para formularios, alertas y modales.
- **Arquitectura por capas**:
  - **Controllers**: manejo de flujos de petición/respuesta.
  - **Services**: lógica de negocio y orquestación de datos.
  - **Repository**: acceso a la base de datos mediante patrón Repository.
  - **Models**: esquemas de datos con Mongoose.
  - **Middlewares**: validaciones y manejo de errores.
- **Configuración mediante variables de entorno**.
- **Automatización del desarrollo** con **nodemon**.

---

## Tecnologías

- **Node.js** v18+
- **Express** v5
- **MongoDB** Atlas (mongoose v8)
- **EJS** (express-ejs-layouts)
- **Tailwind CSS** (en vistas EJS)
- **express-validator** para validaciones de formulario
- **method-override** para soportar PUT y DELETE en formularios
- **dotenv** para configuración de entorno

---

## Requisitos previos

- Tener instalado **Node.js** y **npm**.
- Cuenta en **MongoDB Atlas** o servidor MongoDB accesible.
- Git (opcional, para clonar el repositorio).

---

## Instalación

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/tu-usuario/tu-repo-superheroes.git
   cd tu-repo-superheroes
   ```

2. **Instalar dependencias**  
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**  
   Crear un archivo `.env` en la raíz con el siguiente contenido:  
   ```env
   PORT=3008
   MONGO_URL="mongodb+srv://Grupo-03:grupo03@cursadanodejs.ls9ii.mongodb.net/Node-js"
   ```

4. **Iniciar la aplicación**  
   - Modo desarrollo (con nodemon):  
     ```bash
     npm run dev
     ```
   - Modo producción:  
     ```bash
     npm start
     ```

---

## Estructura de carpetas

\`\`\`
.
├── config
│   └── dbConfig.mjs          # Conexión a MongoDB
├── controllers
│   └── superheroesController.mjs
├── middlewares
│   └── superheroeValidation.mjs
├── models
│   └── superheroe.mjs
├── repository
│   ├── IRespository.mjs
│   └── superHeroRepository.mjs
├── routes
│   └── superHeroRoutes.mjs
├── services
│   └── superheroesService.mjs
├── views
│   ├── layout.ejs
│   ├── landing.ejs
│   ├── dashboard.ejs
│   ├── addSuperhero.ejs
│   ├── editSuperhero.ejs
│   ├── contacto.ejs
│   ├── info.ejs
│   └── partials/
├── public
│   ├── css/
│   └── js/
├── .env
├── package.json
└── server.mjs
\`\`\`

---

## Rutas de la API

### Vistas HTML

| Método | Ruta                      | Descripción                         |
|--------|---------------------------|-------------------------------------|
| GET    | \`/\`                       | Página de inicio (landing)          |
| GET    | \`/contacto\`               | Página de contacto                  |
| GET    | \`/info\`                   | Página de información               |
| GET    | \`/api/heroes\`             | Listado de superhéroes (dashboard)  |
| GET    | \`/api/heroes/agregar\`     | Formulario para agregar             |
| GET    | \`/api/heroes/:id/editar\`  | Formulario para editar              |

### Endpoints JSON

| Método | Ruta                              | Descripción                                    |
|--------|-----------------------------------|------------------------------------------------|
| GET    | \`/api/heroes\`                     | Obtener todos los superhéroes                  |
| POST   | \`/api/heroes/agregar\`             | Crear un nuevo superhéroe                      |
| PUT    | \`/api/heroes/:id/editar\`          | Actualizar un superhéroe por su ID             |
| DELETE | \`/api/heroes/:id\`                 | Eliminar un superhéroe por su ID               |
| DELETE | \`/api/heroes/nombre/:nombre\`      | Eliminar un superhéroe por su nombre           |

#### Ejemplo de respuesta JSON (GET \`/api/heroes\`)

\`\`\`json
{
  "mensaje": "Lista de superhéroes",
  "total": 10,
  "data": [
    {
      "_id": "64c8f1e2a1b2c3d4e5f6a7b8",
      "nombreSuperHeroe": "Spiderman",
      "nombreReal": "Peter Parker",
      "edad": 25,
      "planetaOrigen": "Tierra",
      "debilidad": "Miedo a las alturas",
      "poderes": ["Trepar", "Fuerza", "Telarañas"],
      "aliados": ["Avengers"],
      "enemigos": ["Venom"],
      "creador": "Stan Lee",
      "createdAt": "2023-07-25T12:34:56.789Z"
    },
    ...
  ]
}
\`\`\`

---

## Validaciones

- Se utilizan reglas de **express-validator** en \`superheroeValidation.mjs\`.
- Campos obligatorios:
  - \`nombreSuperHeroe\` y \`nombreReal\`: String de 3–60 caracteres.
  - \`edad\`: entero ≥ 0.
  - \`poderes\`: array de strings (mínimo 1), cada string de 3–60 caracteres.
- Campos opcionales:
  - \`aliados\`, \`enemigos\`: arrays de strings, cada string de 3–60 caracteres.
- En caso de error, se renderiza la vista correspondiente con mensajes de validación.

---

## License

Este proyecto está bajo la licencia **ISC**. Consulte el archivo [\`package.json\`](./package.json) para más detalles.

---

## Autor / Contacto

- **Augusto Villegas**  
- LinkedIn: [linkedin.com/in/augustovillegas/](https://www.linkedin.com/in/augustovillegas/)  
- GitHub: [github.com/augustovillegas](https://github.com/augustovillegas)
