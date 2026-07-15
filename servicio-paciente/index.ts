import Fastify from "fastify";
import dotenv from "dotenv";
import { pacienteRouter } from "./src/router/paciente.router";
import { sequelize } from "./src/config/database";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { pacienteSchemaGlobal } from "./src/schemas/paciente.schemas";

dotenv.config();

const app = Fastify({
    logger: true,
});



const iniciar = async () => {
    try {


        app.addSchema(pacienteSchemaGlobal);
        await app.register(swagger, {
            openapi: {
                openapi: "3.1.1",
                info: {
                    title: "Servicio Paciente",
                    description: "API para gestionar pacientes",
                    version: "1.0.0"
                }
            },
            servers: [
                {
                    url: "http://localhost:3001/api",
                    description: "Servidor local"
                }
            ]
        });


        await app.register(swaggerUI, {
            routePrefix: "/doc"
        });

        app.register(pacienteRouter, { prefix: "/api" });
        await sequelize.authenticate();
        app.log.info("Conexión a la Base de datos Exitosa");

        await sequelize.sync();
        app.log.info("Tablas creadas en la base de daots");

        const puerto = Number(process.env.PORT) || 3001;
        app.listen({ port: puerto, host: "0.0.0.0" })

    } catch (error) {
        app.log.error("Eerrpr al iniciar programa");
    }
}

iniciar();