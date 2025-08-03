import { body, validationResult } from "express-validator";

export const registerSuperheroeValidation = () => [
  body("nombreSuperHeroe")
    .trim()
    .notEmpty()
    .withMessage("El nombre del superhéroe es obligatorio")
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre del superhéroe debe tener entre 3 y 60 caracteres."),

  body("nombreReal")
    .trim()
    .notEmpty()
    .withMessage("El nombre real es obligatorio")
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre real debe tener entre 3 y 60 caracteres."),

  body("edad")
    .notEmpty()
    .withMessage("La edad es obligatoria")
    .isInt({ min: 0 })
    .withMessage("La edad debe ser un número entero mayor o igual a 0."),

  body("poderes")
    .notEmpty()
    .withMessage("Por favor, ingresa al menos un poder para el superhéroe.")
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
      return value;
    })

    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error("El campo de poderes no es válido. Debe ser una lista separada por comas.");
      }
      if (value.length === 0) {
        throw new Error("Por favor, ingresa al menos un poder.");
      }
      for (const p of value) {
        if (
          typeof p !== "string" ||
          p.trim().length < 3 ||
          p.trim().length > 60
        ) {
          throw new Error("Cada poder debe tener entre 3 y 60 caracteres. Ej: Rayo, Visión nocturna");
        }
      }
      return true;
    }),

  body("aliados")
    .optional()
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
      return value;
    })
    .custom((value) => {
      if (!Array.isArray(value))
        throw new Error("Los aliados deben ingresarse como una lista separada por comas.");
      for (const a of value) {
        if (
          typeof a !== "string" ||
          a.trim().length < 3 ||
          a.trim().length > 60
        ) {
          throw new Error(
            "Cada aliado debe tener entre 3 y 60 caracteres. Ej: Hulk, Thor"
          );
        }
      }
      return true;
    }),

  body("enemigos")
    .optional()
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
      return value;
    })
    .custom((value) => {
      if (!Array.isArray(value))
        throw new Error("Los enemigos deben ingresarse como una lista separada por comas.");
      for (const e of value) {
        if (
          typeof e !== "string" ||
          e.trim().length < 3 ||
          e.trim().length > 60
        ) {
          throw new Error(
            "Cada enemigo debe tener entre 3 y 60 caracteres. Ej: Batman, Robin"
          );
        }
      }
      return true;
    }),
];

export const runValidation = (req, res, next) => {
  console.log("📥 Body recibido:", req.body);

  const errors = validationResult(req);
  console.log("📛 Errores de validación:", errors.array());

  if (!errors.isEmpty()) {
    const isEditing = req.originalUrl.includes("/editar");

    const old = { ...req.body };

    if (Array.isArray(old.poderes)) old.poderes = old.poderes.join(", ");
    if (Array.isArray(old.aliados)) old.aliados = old.aliados.join(", ");
    if (Array.isArray(old.enemigos)) old.enemigos = old.enemigos.join(", ");

    return res
      .status(400)
      .render(isEditing ? "editSuperhero" : "addSuperhero", {
        errors: errors.array(),
        old,
        superhero: isEditing ? { _id: req.params.id, ...req.body } : undefined,
      });
  }

  console.log("✅ Validación OK, pasa al siguiente middleware");
  next();
};
