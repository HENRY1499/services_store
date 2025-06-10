import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { db_project } from "../configuration/database";

export class ProductModel extends Model<
  InferAttributes<ProductModel>,
  InferCreationAttributes<ProductModel>
> {
  declare id_product: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare sales_price: string;
  declare purchase_price: string;
  declare stock: number;
  declare id_category: number;
  declare status: number;
  declare createdat: CreationOptional<Date>; // si no usas timestamps puedes omitir estos
  declare updatedat: CreationOptional<Date>;
}
ProductModel.init(
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
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    id_category: {
      type: DataTypes.INTEGER,
    },
    createdat: {
      type: DataTypes.DATE,
    },
    updatedat: { type: DataTypes.DATE },
  },
  {
    sequelize: db_project,
    modelName: "products",
    tableName: "products",
    timestamps: false,
    freezeTableName: true,
  }
);
