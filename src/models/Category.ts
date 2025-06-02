import { DataTypes } from "sequelize";
import { db_project } from "../configuration/database";

export const Category = db_project.define(
  "categories",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.CHAR,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);
