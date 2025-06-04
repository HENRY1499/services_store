import { DataTypes } from "sequelize";
import { db_project } from "../configuration/database";

export const Category = db_project.define(
  "categories",
  {
    id_categories: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.CHAR,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
