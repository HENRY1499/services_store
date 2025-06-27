import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { db_project } from "../configuration/database";

export class DetailSaleModel extends Model<
  InferAttributes<DetailSaleModel>,
  InferCreationAttributes<DetailSaleModel>
> {
  declare id_detail: CreationOptional<number>;
  declare quantity: number;
  declare sales_price: string;
  declare subtotal: string;
  declare id_product: number;
  declare id_sale: number;
}

DetailSaleModel.init(
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
      type: DataTypes.STRING,
      defaultValue: 0.0,
    },
    subtotal: {
      type: DataTypes.DECIMAL,
    },
    id_product: {
      type: DataTypes.INTEGER,
    },
    id_sale: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db_project,
    modelName: "details_sales",
    tableName: "details_sales",
    timestamps: false,
    freezeTableName: true,
  }
);
