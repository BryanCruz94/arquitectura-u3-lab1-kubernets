import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Cita = sequelize.define(
  "Cita",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    medicoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "cita",
    timestamps: false,
  }
);