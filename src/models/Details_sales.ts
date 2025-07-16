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
  declare id_sale: number;
  declare subtotal: number;
  declare quantity: number;
  declare id_product: number;
  declare sales_price: number;
  declare pay_method: string;
  declare createdat: Date; // si no usas timestamps puedes omitir estos
  declare updatedat?: Date;
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
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.0,
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.0,
    },
    id_product: {
      type: DataTypes.INTEGER,
    },
    pay_method: {
      type: DataTypes.STRING,
    },
    id_sale: {
      type: DataTypes.DATE,
    },
    createdat: {
      type: DataTypes.DATE,
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
