// scripts/generateExtendedSuperheroes.mjs
import fs from "fs/promises";
import path from "path";

async function generarJSONExtendido() {
  try {
    // 1) Leer el JSON original de superhéroes
    const originalPath = path.resolve("superheroes.json");
    const contenido = await fs.readFile(originalPath, "utf8");
    const heroesExistentes = JSON.parse(contenido);

    // 2) Definir 100 nombres de héroes reales
    const nombresHeroes = [
      // Marvel (40)
      "Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Hawkeye", "Spider-Man", "Doctor Strange", "Black Panther", "Captain Marvel",
      "Ant-Man", "Wasp", "Scarlet Witch", "Vision", "Falcon", "Winter Soldier", "War Machine", "Luke Cage", "Jessica Jones", "Daredevil",
      "Punisher", "Ghost Rider", "Blade", "Silver Surfer", "Cyclops", "Wolverine", "Storm", "Jean Grey", "Professor X", "Magneto",
      "Beast", "Nightcrawler", "Rogue", "Gambit", "Colossus", "Iceman", "Angel", "Kitty Pryde", "Deadpool", "She-Hulk",
      // DC (30)
      "Superman", "Batman", "Wonder Woman", "Flash", "Green Lantern", "Aquaman", "Cyborg", "Martian Manhunter", "Green Arrow", "Black Canary",
      "Hawkman", "Hawkgirl", "Shazam", "Supergirl", "Batgirl", "Robin", "Nightwing", "Catwoman", "The Atom", "Firestorm",
      "Plastic Man", "Blue Beetle", "Booster Gold", "Zatanna", "Constantine", "Swamp Thing", "Black Lightning", "Red Tornado", "Superboy", "Steel",
      // Capcom (20)
      "Ryu", "Ken Masters", "Chun-Li", "Guile", "Dhalsim", "Zangief", "Blanka", "E. Honda", "Cammy", "Sakura",
      "Juri Han", "Poison", "Alex", "Sean", "Karin Kanzuki", "Rose", "Elena", "Maki", "Cody", "Guy",
      // SNK (10)
      "Terry Bogard", "Mai Shiranui", "Kyo Kusanagi", "Iori Yagami", "Ryo Sakazaki", "Athena Asamiya", "Leona Heidern", "Kim Kaphwan", "Kula Diamond", "Benimaru Nikaido"
    ];

    // 3) Mapear cada nombre a un objeto con todas las propiedades
    const nuevosHeroes = nombresHeroes.map((nombre, i) => {
      // Determinar creador según el universo
      let creador;
      if (i < 40) creador = "Marvel";
      else if (i < 70) creador = "DC";
      else if (i < 90) creador = "Capcom";
      else creador = "SNK";

      // Planeta de origen especial para algunos
      let planeta = "Tierra";
      if (nombre === "Superman") planeta = "Krypton";
      if (nombre === "Thor") planeta = "Asgard";
      if (nombre === "Martian Manhunter") planeta = "Marte";

      return {
        nombreSuperHeroe: nombre,
        nombreReal: `Identidad de ${nombre}`,
        edad: 25 + (i % 30),
        planetaOrigen: planeta,
        debilidad: "Debilidad Genérica",
        poderes: [`Poder de ${nombre}`, `Habilidad de ${nombre}`],
        aliados: creador === "Marvel" ? ["Los Vengadores"]
                : creador === "DC" ? ["La Liga de la Justicia"]
                : creador === "Capcom" ? ["Fighters"]
                : ["Fatal Fury Team"],
        enemigos: [`Enemigo de ${nombre}`],
        creador
      };
    });

    // 4) Unir original + nuevos y volcar a un nuevo archivo
    const extendido = [...heroesExistentes, ...nuevosHeroes];
    const salidaPath = path.resolve("superheroes_extended.json");
    await fs.writeFile(salidaPath, JSON.stringify(extendido, null, 2), "utf8");

    console.log(`✅ Generado ${salidaPath} con ${extendido.length} superhéroes`);
  } catch (err) {
    console.error("❌ Error generando JSON extendido:", err);
  }
}

// Ejecutar desde CLI: node scripts/generateExtendedSuperheroes.mjs
if (import.meta.url === `file://${process.argv[1]}`) {
  generarJSONExtendido();
}

export { generarJSONExtendido };
