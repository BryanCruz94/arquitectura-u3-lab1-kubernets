import type { FastifyInstance } from "fastify";

import {
  crearMedico,
  obtenerMedicos,
  obtenerMedicoId,
  eliminarMedico,
  actualizarMedico,
} from "../controller/medico.controller";

export const medicoRouter = (app: FastifyInstance) => {

  // Obtener todos
  app.get("/medicos", async () => {
    return await obtenerMedicos();
  });

  // Obtener por ID
  app.get("/medicos/:id", async (req, reply) => {
    try {
      const { id } = req.params as any;

      return await obtenerMedicoId(id);

    } catch (error) {
      console.log(error);

      reply.code(404).send({
        error: "No se encontró el médico",
      });
    }
  });

  // Crear
  app.post("/medico", async (req, reply) => {
    try {
      const medico = req.body;

      const nuevoMedico = await crearMedico(medico);

      reply.code(201).send(nuevoMedico);

    } catch (error) {
      console.log(error);

      reply.code(400).send({
        error: "No se pudo guardar el médico",
      });
    }
  });

  // Actualizar
  app.put("/medico/:id", async (req, reply) => {
    try {
      const { id } = req.params as any;

      const medico = req.body;

      await actualizarMedico(id, medico);

      reply.code(200).send({
        mensaje: "Médico actualizado correctamente",
      });

    } catch (error) {
      console.log(error);

      reply.code(404).send({
        error: "No se encontró el médico",
      });
    }
  });

  // Eliminar
  app.delete("/medico/:id", async (req, reply) => {
    try {
      const { id } = req.params as any;

      return await eliminarMedico(id);

    } catch (error) {
      console.log(error);

      reply.code(404).send({
        error: "No se encontró el médico",
      });
    }
  });
};