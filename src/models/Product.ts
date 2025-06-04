import { DataTypes } from "sequelize";
import { db_project } from "../configuration/database";

export const Product = db_project.define(
  "products",
  {
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sales_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    purchase_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.CHAR, defaultValue: 1 },
    id_category: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
