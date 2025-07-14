import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { db_project } from "../configuration/database";

export class CategoryModel extends Model<
  InferAttributes<CategoryModel>,
  InferCreationAttributes<CategoryModel>
> {
  declare id_categories: CreationOptional<number>;
  declare name: string;
  declare rol: number;
  declare status: number;
  declare createdat: string; // si no usas timestamps puedes omitir estos
  declare updatedat?: string;
}

CategoryModel.init(
  {
    id_categories: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    rol: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    createdat: {
      type: DataTypes.DATE,
    },
    updatedat: { type: DataTypes.DATE },
  },
  {
    sequelize: db_project,
    modelName: "categories",
    tableName: "categories",
    timestamps: false,
    freezeTableName: true,
  }
);
