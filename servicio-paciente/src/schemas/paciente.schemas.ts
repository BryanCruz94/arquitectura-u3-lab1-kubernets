export const pacienteSchemaGlobal = {
    $id: "Paciente",
    type: "object",
    properties: {
        id: {
            type: "integer",
            description: "Identificador unico del paciente"
        },
        nombre: {
            type: "string",
            description: "Nombre del paciente",
        },
        email: {
            type: "string",
            format: "email",
            description: "Correo Electronico del paciente"
        }
    }
}

export const pacienteSchema = {
    type: "object",
    required: ["nombre", "email"],
    properties: {
        nombre: {
            type: "string",
            description: "Nombre del paciente",
        },
        email: {
            type: "string",
            format: "email",
            description: "Correo Electronico del paciente"
        }
    }
}

export const pacienteParamsSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "integer",
            description: "Identificador unico del paciente"
        }
    }
}

export const errorSchema = {
    type: "object",
    properties: {
        error: {
            type: "string",
            description: "Mensaje de error"
        }
    }
}

export const mensajeSchema = {
    type: "object",
    properties: {
        mensaje: {
            type: "string",
            description: "Mensaje de confirmación"
        }
    }
}