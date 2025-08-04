import superHeroRepository from "../repository/superHeroRepository.mjs";

export const obtenerTodosLosSuperheroes = async () => {
  return await superHeroRepository.obtenerTodos();
};

export const obtenerSuperheroePorId = async (id) => {
  return await superHeroRepository.obtenerPorId(id); 
};

export const crearSuperheroe = async (data) => {
  return await superHeroRepository.crear(data);
};

export const actualizarSuperheroe = async (id, data) => {
  return await superHeroRepository.actualizar(id, data);
};

export const eliminarSuperheroe = async (id) => {
  return await superHeroRepository.eliminar(id);
};

export const eliminarSuperheroePorNombre = async (nombre) => {
  return await superHeroRepository.eliminarPorNombre(nombre);
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               