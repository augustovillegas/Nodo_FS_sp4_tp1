import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { conectarDB } from "../config/dbConfig.mjs";
import { SuperHero }  from "../models/superheroe.mjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const JSON_PATH = path.join(__dirname, "..", "superheroes.json");

const isDirectInvocation = process.argv[1] === __filename;

export async function reestablecerBD() {
  try {
    console.log("🔌 Conectando a MongoDB…");
    await conectarDB();

    console.log(`📂 Leyendo archivo: ${JSON_PATH}`);
    const contenido = await fs.readFile(JSON_PATH, "utf-8");
    const datos = JSON.parse(contenido);
    console.log(`📊 JSON tiene ${datos.length} héroes`);

    console.log("🗑 Borrando colección…");
    const { deletedCount } = await SuperHero.deleteMany({});
    console.log(`🗑 Eliminados: ${deletedCount} documentos`);

    console.log("📥 Insertando héroes…");
    const insertados = await SuperHero.insertMany(datos);
    console.log(`✅ Insertados: ${insertados.length} documentos`);
  } catch (err) {
    console.error("❌ Error en resetDatabase:", err);
  } finally {    
    if (isDirectInvocation) {
      await mongoose.disconnect();
      console.log("🔌 MongoDB desconectado (CLI)");
    }
  }
}

// consola: node scripts/resetDatabase.mjs
if (isDirectInvocation) {
  reestablecerBD().then(() => process.exit(0));
}
