import { CategoryModel } from "./Category";
import { ProductModel } from "./Product";
import { Sales } from "./Sales";
import { Details_sales } from "./Details_sales";
// PRODUCT-CATEGORY
CategoryModel.hasMany(ProductModel, { foreignKey: "id_category" });
ProductModel.belongsTo(CategoryModel, { foreignKey: "id_category" });

// PRODUCT - SALES
ProductModel.belongsToMany(Sales, {
  through: Details_sales,
  foreignKey: "id_product",
  otherKey: "id_sales",
});
Sales.belongsToMany(ProductModel, {
  through: Details_sales,
  foreignKey: "id_sales",
  otherKey: "id_product",
});

export { CategoryModel, ProductModel, Sales, Details_sales };
