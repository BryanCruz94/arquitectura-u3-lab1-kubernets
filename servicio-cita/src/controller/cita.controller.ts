import { Cita } from "../models/cita.model";

export const obtenerCitas = async () => {
  return await Cita.findAll();
};

export const obtenerCitaId = async (id: number) => {
  const cita = await Cita.findByPk(id);

  if (!cita) {
    throw new Error("Cita no encontrada");
  }

  return cita;
};

export const crearCita = async (data: any) => {
  const paciente = await fetch('http://servicio-paciente/api/pacientes/' + data.pacienteId);
  const medico = await fetch('http://servicio-medico/api/medicos/' + data.medicoId);
  if (!paciente.ok) {
    throw new Error("Paciente no encontrado");
  }
  if (!medico.ok) {
    throw new Error("Médico no encontrado");
  }



  return await Cita.create(data);
};

export const actualizarCita = async (id: number, data: any) => {
  const cita = await Cita.findByPk(id);

  const resPaciente = await fetch('http://servicio-paciente/api/pacientes/' + data.pacienteId);
  const paciente: any = await resPaciente.json();
  const resMedico = await fetch('http://servicio-medico/api/medicos/' + data.medicoId);
  const medico: any = await resMedico.json();

  if (!paciente.ok) {
    throw new Error("Paciente no encontrado");
  }
  if (!medico.ok) {
    throw new Error("Médico no encontrado");
  }

  if (!cita) {
    throw new Error("Cita no encontrada");
  }

  await cita.update(data);
  return cita;
};

export const eliminarCita = async (id: number) => {
  const cita = await Cita.findByPk(id);

  if (!cita) {
    throw new Error("Cita no encontrada");
  }

  await cita.destroy();

  return { mensaje: "Cita eliminada" };
};