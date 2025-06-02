import { Category } from "./Category";
import { Product } from "./Product";

Category.hasMany(Product, { foreignKey: "id_category" });
Product.belongsTo(Category, { foreignKey: "id_category" });
