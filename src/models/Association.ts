import { Category } from "./Category";
import { Product } from "./Product";
import { Sales } from "./Sales";
import { Details_sales } from "./Details_sales";
// PRODUCT-CATEGORY
Category.hasMany(Product, { foreignKey: "id_category" });
Product.belongsTo(Category, { foreignKey: "id_category" });

// PRODUCT - SALES
Product.belongsToMany(Sales, {
  through: Details_sales,
  foreignKey: "id_product",
  otherKey: "id_sales",
});
Sales.belongsToMany(Product, {
  through: Details_sales,
  foreignKey: "id_sales",
  otherKey: "id_product",
});

export { Category, Product, Sales, Details_sales };
