import mongoose from "mongoose";

const superheroSchema = new mongoose.Schema({
  nombreSuperHeroe: String,
  nombreReal:      String,
  edad:            Number,
  planetaOrigen:   { type: String, default: 'Desconocido' },
  debilidad:       String,
  poderes:         [String],
  aliados:         [String],
  enemigos:        [String],
  creador:         String,  
  createdAt:       { type: Date, default: Date.now}
});

export const SuperHero = mongoose.model("SuperHero", superheroSchema, 'superheroes');

