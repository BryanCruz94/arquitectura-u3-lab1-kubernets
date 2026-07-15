import { Medico } from "../models/medico.model";

export const obtenerMedicos = async () => {
  return await Medico.findAll();
};

export const obtenerMedicoId = async (id: number) => {
  const medico = await Medico.findByPk(id);

  if (!medico) {
    throw new Error("Médico no encontrado");
  }

  return medico;
};

export const crearMedico = async (data: any) => {
  return await Medico.create(data);
};

export const actualizarMedico = async (id: number, data: any) => {
  const medico = await Medico.findByPk(id);

  if (!medico) {
    throw new Error("Médico no encontrado");
  }

  await medico.update(data);
  return medico;
};

export const eliminarMedico = async (id: number) => {
  const medico = await Medico.findByPk(id);

  if (!medico) {
    throw new Error("Médico no encontrado");
  }

  await medico.destroy();

  return { mensaje: "Médico eliminado" };
};