import type { FastifyInstance } from "fastify";

import {
  obtenerCitas,
  obtenerCitaId,
  crearCita,
  actualizarCita,
  eliminarCita
} from "../controller/cita.controller";

export const citaRouter = (app: FastifyInstance) => {

  // Obtener todos
  app.get("/citas", async () => {
    return await obtenerCitas();
  });

  // Obtener por ID
  app.get("/citas/:id", async (req, reply) => {
    try {
      const { id } = req.params as any;

      return await obtenerCitaId(id);

    } catch (error) {
      console.log(error);

      reply.code(404).send({
        error: "No se encontró la cita",
      });
    }
  });

  // Crear
  app.post("/cita", async (req, reply) => {
    try {
      const cita = req.body;

      const nuevaCita = await crearCita(cita);

      reply.code(201).send(nuevaCita);

    } catch (error) {
      console.log(error);

      reply.code(400).send({
        error: "No se pudo guardar la cita",
      });
    }
  });

  // Actualizar
  app.put("/cita/:id", async (req, reply) => {
    try {
      const { id } = req.params as any;

      const cita = req.body;

      await actualizarCita(id, cita);

      reply.code(200).send({
        mensaje: "Cita actualizada correctamente",
      });

    } catch (error) {
      console.log(error);

      reply.code(404).send({
        error: "No se encontró la cita",
      });
    }
  });

  // Eliminar
  app.delete("/cita/:id", async (req, reply) => {
    try {
      const { id } = req.params as any;

      return await eliminarCita(id);

    } catch (error) {
      console.log(error);

      reply.code(404).send({
        error: "No se encontró la cita",
      });
    }
  });
};