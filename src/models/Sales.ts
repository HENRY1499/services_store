import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { db_project } from "../configuration/database";

export class SalesModel extends Model<
  InferAttributes<SalesModel>,
  InferCreationAttributes<SalesModel>
> {
  declare id_sale: CreationOptional<number>;
  declare total: number;
  declare status: number;
  declare createdat: string;
  declare updatedat?: string;
}

SalesModel.init(
  {
    id_sale: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.NUMBER,
    },
    createdat: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db_project,
    modelName: "sales",
    tableName: "sales",
    timestamps: false,
    freezeTableName: true,
  }
);
