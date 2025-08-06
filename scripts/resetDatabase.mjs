// scripts/resetDatabase.mjs
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";       // <-- Añadido para detectar ejecución directa
import { conectarDB } from "../config/dbConfig.mjs";  // corregido: apuntar al config real :contentReference[oaicite:3]{index=3}
import { SuperHero }  from "../models/superheroe.mjs";       // corregido: apuntar al root

dotenv.config();

export async function reestablecerBD() {
  try {
    // 1) Conectar
    await conectarDB();

    // 2) Leer JSON fuente
    const filePath = path.resolve("superheroes_extended.json");
    const contenido = await fs.readFile(filePath, "utf8");
    const datos = JSON.parse(contenido);

    // 3) Borrar e insertar
    await SuperHero.deleteMany({});
    await SuperHero.insertMany(datos);
    console.log(`🔄 BD reestablecida con ${datos.length} registros`);

  } catch (err) {
    console.error("❌ Error al reestablecer BD:", err);
  } finally {
    // 4) Desconectar
    await mongoose.disconnect();
    console.log("🔌 MongoDB desconectado");
  }
}

// → Ejecutar sólo si se llama directamente: node scripts/resetDatabase.mjs
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {       // reemplaza la condición anterior :contentReference[oaicite:4]{index=4}
  reestablecerBD().then(() => process.exit(0));
}
