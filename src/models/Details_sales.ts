import { DataTypes } from "sequelize";
import { db_project } from "../configuration/database";
export const Details_sales = db_project.define(
  "details_sales",
  {
    id_detail: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sales_price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    subtotal: {
      type: DataTypes.DECIMAL,
    },
    id_product: {
      type: DataTypes.INTEGER,
    },
    id_sales: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
