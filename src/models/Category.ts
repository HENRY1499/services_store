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
  declare image: string;
  declare status: number;
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
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize: db_project,
    modelName: "categories",
    tableName: "categories",
    timestamps: false,
    freezeTableName: true,
  }
);
