import express from "express";
import dotenv from "dotenv";
import path from "path";
import methodOverride from "method-override";
import expressLayouts from "express-ejs-layouts";
import cron from "node-cron";
import superHeroRoutes from "./routes/superHeroRoutes.mjs";
import { conectarDB } from "./config/dbConfig.mjs";
import { reestablecerBD } from "./scripts/resetDatabase.mjs";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3008;

// Pareser bpdy de formularios
app.use(express.urlencoded({ extended: true }));

// Soporte para métodos HTTP como PUT y DELETE desde formularios
app.use(methodOverride('_method'));

// Parsear JSON
app.use(express.json());

// Archivos estáticos
app.use(express.static('public'));

// Conexion a DB 
await conectarDB();

// Config EJS (Motor de vistas)
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

// Configurar express-ejs-layout
app.use(expressLayouts);
app.set('layout', 'layout');
app.use((req, res, next) => {
  const cleanPath = req.path.split('/')[1];
  res.locals.page = cleanPath === '' ? 'home' : cleanPath;
  next();
}); // Middleware para fondo de deadpool

// Rutas 
app.get("/", (req, res) => res.render("landing", { title: "Inicio"}));
app.get("/contacto", (req, res) => res.render("contacto", { title: "Contacto"}));
app.get("/info", (req, res) => res.render("info", { title: "Información"}));
app.use("/api", superHeroRoutes);

// Manejo de errores para rutas no encontradas 
app.use((req, res) => {
  res.status(404).send({ mensaje: "404 Not Found - Ruta no encontrada" });
});

// → Tarea cron: cada 30 minutos
cron.schedule("*/30 * * * *", () => {
  console.log("🕒 Ejecutando resetDatabase cada 30 minutos");
  reestablecerBD();
});

// Levantar el servidor 
app.listen(PORT, () => {
  console.log("##########################");
  console.log("######## API REST ########");
  console.log("##########################");
  console.log(`http://localhost:${PORT}/`);
});
