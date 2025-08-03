import {
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
  eliminarSuperheroePorNombre,
  obtenerSuperheroePorId,
  obtenerTodosLosSuperheroes
} from "../services/superheroesService.mjs";

import { renderizarSuperheroe } from "../views/responseView.mjs";

export const obtenerTodosLosSuperheroesController = async (req, res) => {
  console.log("📥 GET /api/heroes - Obtener todos los superhéroes");
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    console.log("✅ Superhéroes obtenidos:", superheroes.length);

    if (req.accepts("html")) {
      // Pasa 'errors' como un array vacío por defecto
      return res.render("dashboard", { superheroes, errors: [] });
    }

    if (req.accepts("json")) {
      return res.status(200).json({
        mensaje: "Lista de superhéroes",
        total: superheroes.length,
        data: superheroes.map(renderizarSuperheroe),
      });
    }

    return res.status(406).send("Not Acceptable: Solo HTML o JSON.");
  } catch (error) {
    console.error("❌ Error al obtener superhéroes:", error);    
    return res.status(500).render("dashboard", {
        superheroes: [], 
        errors: [{ msg: "Error al cargar los superhéroes: " + error.message }],
        old: {} 
    });
  }
};

export const formularioAgregarSuperheroeController = (req, res) => {
  console.log("📥 GET /api/heroes/agregar - Formulario agregar");
  res.render("addSuperhero", { errors: [], old: {} });
};

export const crearSuperheroeController = async (req, res) => {
  const old = { ...req.body };

  console.log("📤 POST /api/heroes/agregar - Body recibido:", old);

  try {
    const nuevo = await crearSuperheroe(req.body);
    console.log("✅ Superhéroe creado:", nuevo);

    if (req.accepts("html")) {
      return res.redirect("/api/heroes");
    }

    if (req.accepts("json")) {
      return res.status(201).json({
        mensaje: "Superhéroe creado con éxito.",
        data: renderizarSuperheroe(nuevo),
      });
    }

    return res.status(406).send("Not Acceptable");
  } catch (error) {
    console.error("❌ Error al crear superhéroe:", error);

    if (req.accepts("json")) {
      return res.status(400).json({ mensaje: "Error al crear", error: error.message });
    }

    return res.status(500).render("addSuperhero", {
      errors: [{ msg: error.message }],      
      old,
    });
  }
};

export const formularioEditarSuperheroeController = async (req, res) => {
  console.log(`📥 GET /api/heroes/${req.params.id}/editar - Formulario editar`);

  try {
    const superhero = await obtenerSuperheroePorId(req.params.id);

    if (!superhero) {
      // También pasamos errors aquí si no se encuentra el superhéroe
      return res.status(404).render("dashboard", {
          superheroes: await obtenerTodosLosSuperheroes(), // Recargamos para mostrar el dashboard completo
          errors: [{ msg: "Superhéroe no encontrado para editar." }],
          success: [],
          old: {}
      });
    }

    res.render("editSuperhero", { errors: [], old: {}, superhero });
  } catch (error) {
    console.error("❌ Error al cargar edición:", error);
    // En caso de error al cargar edición, también se pasa un array de errores
    return res.status(500).render("dashboard", {
        superheroes: await obtenerTodosLosSuperheroes(), // Recargamos para mostrar el dashboard completo
        errors: [{ msg: "Error al buscar superhéroe: " + error.message }],
        success: [],
        old: {}
    });
  }
};

export const actualizarSuperheroeController = async (req, res) => {
  const id = req.params.id;
  const old = { ...req.body, _id: id };

  console.log(`📝 PUT /api/heroes/${id}/editar - Datos recibidos`, req.body);

  try {
    const actualizado = await actualizarSuperheroe(id, req.body);

    if (!actualizado) {
      const mensaje = "Superhéroe no encontrado para actualizar.";

      if (req.accepts("json")) {
        return res.status(404).json({ mensaje, id });
      }

      return res.status(404).render("editSuperhero", { errors: [{ msg: mensaje }], old });
    }

    console.log("✅ Superhéroe actualizado:", actualizado);

    if (req.accepts("html")) {
      return res.redirect("/api/heroes");
    }

    if (req.accepts("json")) {
      return res.status(200).json({
        mensaje: "Actualización exitosa.",
        data: renderizarSuperheroe(actualizado),
      });
    }

    return res.status(406).send("Not Acceptable.");
  } catch (error) {
    console.error("❌ Error al actualizar:", error);

    if (req.accepts("json")) {
      return res.status(400).json({
        mensaje: "Error al actualizar",
        error: error.message,
      });
    }

    return res.status(400).render("editSuperhero", {
      errors: [{ msg: error.message }],
      old,
    });
  }
};

export const eliminarSuperheroeController = async (req, res) => {
  const id = req.params.id;
  console.log(`🗑️ DELETE /api/heroes/${id} - Eliminar superhéroe`);

  try {
    const eliminado = await eliminarSuperheroe(id);

    if (!eliminado) {
      console.warn("⚠️ Superhéroe no encontrado para eliminar");
      if (req.accepts("html")) {
        const superheroes = await obtenerTodosLosSuperheroes();
        return res.status(404).render("dashboard", {
          superheroes,
          errors: [{ msg: "Superhéroe no encontrado para eliminar." }],
          old: {}
        });
      }
      if (req.accepts("json")) {
        return res.status(404).json({ mensaje: "Superhéroe no encontrado." });
      }
      return res.status(406).send("Not Acceptable");
    }

    console.log("✅ Eliminado correctamente:", eliminado);

    // 1º rama: petición HTML → redirect
    if (req.accepts("html")) {
      return res.redirect("/api/heroes");
    }

    // 2º petición JSON → devolver JSON
    if (req.accepts("json")) {
      return res.status(200).json({
        mensaje: "Superhéroe eliminado correctamente.",
        data: renderizarSuperheroe(eliminado),
      });
    }

    return res.status(406).send("Not Acceptable");
  } catch (error) {
    console.error("❌ Error al eliminar:", error);
    if (req.accepts("html")) {
      const superheroes = await obtenerTodosLosSuperheroes();
      return res.status(500).render("dashboard", {
        superheroes,
        errors: [{ msg: "Error al eliminar superhéroe: " + error.message }],
        old: {}
      });
    }
    if (req.accepts("json")) {
      return res.status(500).json({
        mensaje: "Error al eliminar superhéroe",
        error: error.message
      });
    }
    return res.status(406).send("Not Acceptable");
  }
};

export const eliminarSuperheroePorNombreController = async (req, res) => {
  const nombre = req.params.nombre;

  console.log(`🗑️ DELETE /api/heroes/nombre/${nombre} - Eliminar por nombre`);

  try {
    const eliminado = await eliminarSuperheroePorNombre(nombre);

    if (!eliminado) {
      return res.status(404).json({ mensaje: "No encontrado por nombre" });
    }

    return res.status(200).json({
      mensaje: "Eliminado correctamente",
      data: renderizarSuperheroe(eliminado),
    });
  } catch (error) {
    console.error("❌ Error al eliminar por nombre:", error);
    return res.status(500).json({
      mensaje: "Error al eliminar por nombre",
      error: error.message,
    });
  }
};