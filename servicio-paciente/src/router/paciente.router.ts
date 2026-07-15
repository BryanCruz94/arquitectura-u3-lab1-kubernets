import type { FastifyInstance } from "fastify";
import { creaPaciente, obtenerPacientes, obtenerPacientesId, eliminarPaciente, actualizarPaciente } from "../controller/paciente.controller";
import { pacienteParamsSchema, pacienteSchema, errorSchema, mensajeSchema } from "../schemas/paciente.schemas";

export const pacienteRouter = (app: FastifyInstance) => {
    app.get("/pacientes", {
        schema: {
            tags: ["Paciente"],
            summary: "Obtener todos los pacientes",
            description: "Obtiene una lista de todos los pacientes registrados en el sistema",
            response: {
                200: {
                    type: "array",
                    items: {
                        $ref: "Paciente#"
                    }
                }
            }
        }
    }, obtenerPacientes);


    app.get("/pacientes/:id", {
        schema: {
            tags: ["Paciente"],
            summary: "Obtener paciente por Id",
            description: "Retorna un paciente por Id",
            params: pacienteParamsSchema,
            response: {
                200: {
                    $ref: "Paciente#"
                },
                404: errorSchema
            }
        }
    }
        , async (req, reply) => {
            try {
                const { id } = req.params as any;
                return await obtenerPacientesId(id);
            } catch (error) {
                reply.send({ error: "Id no válido" });
                console.log(error);
            }
        });



    app.post("/paciente", {
        schema: {
            tags: ["Paciente"],
            summary: "Crear paciente",
            description: "Crea un nuevo paciente enviando nombre y email",
            body: pacienteSchema,
            response: {
                201: {
                    $ref: "Paciente#"
                },
                404: errorSchema,
                400: errorSchema
            }
        }
    }, async (req, reply) => {
        try {
            const paciente = req.body;
            return await creaPaciente(paciente);

        } catch (error) {
            console.log(error);
            reply.send({ error: "No seha podido guardar paciente" })
        }
    });

    app.put("/paciente/:id",
        {
            schema: {
                tags: ["Paciente"],
                summary: "Actualiza paciente",
                description: "Método para actualizar paciente",
                params: pacienteParamsSchema,
                body: pacienteSchema,
                response: {
                    200: {
                        $ref: "Paciente#"
                    },
                    404: errorSchema,
                    400: errorSchema
                }
            }
        },
        async (req, reply) => {
            try {
                const { id } = req.params as any;
                const paciente = req.body;
                await actualizarPaciente(id, paciente);
                reply.send({ mensaje: "Registro Exitoso" })
            } catch (error) {
                console.log(error);
                reply.code(404).send({ error: "No se encontró pacientes" })
            }
        });

    app.delete("/paciente/:id",
        {
            schema: {
                tags: ["Paciente"],
                summary: "Eliminar paciente",
                description: "Elimina un paciente por Id",
                params: pacienteParamsSchema,
                response: {
                    200: mensajeSchema,
                    404: errorSchema,
                    400: errorSchema
                }
            }
        }
        , async (req, reply) => {
            try {
                const { id } = req.params as any;
                return await eliminarPaciente(id);
            } catch (error) {
                console.log(error);
                reply.send({ error: "No se encontró pacientes" })
            }
        });
}
