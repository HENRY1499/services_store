import { DataTypes } from "sequelize";
import { db_project } from "../configuration/database";

export const Sales = db_project.define(
  "sales",
  {
    id_sales: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);
