import { CategoryModel } from "./Category";
import { ProductModel } from "./Product";
import { SalesModel } from "./Sales";
import { DetailSaleModel } from "./Details_sales";
// PRODUCT-CATEGORY
CategoryModel.hasMany(ProductModel, { foreignKey: "id_category" });
ProductModel.belongsTo(CategoryModel, { foreignKey: "id_category" });

// PRODUCT - SALES
ProductModel.belongsToMany(SalesModel, {
  through: DetailSaleModel,
  foreignKey: "id_product",
  otherKey: "id_sale",
});

// SALES - DETAILS_SALES
SalesModel.hasMany(DetailSaleModel, { foreignKey: "id_sale" });
DetailSaleModel.belongsTo(SalesModel, { foreignKey: "id_sale" });

// PRODUCT - DETAILS_SALES
ProductModel.hasMany(DetailSaleModel, { foreignKey: "id_product" });
DetailSaleModel.belongsTo(ProductModel, { foreignKey: "id_product" });

export { CategoryModel, ProductModel, SalesModel, DetailSaleModel };
