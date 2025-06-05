import { ProductModel } from "../models/Product";
import { Sales } from "../models/Sales";
import { IProduct } from "../types/general";

const getSales = async () => {
  return await Sales.findAll({
    attributes: [["id_sales", "sid"], "total", "createdat"],
  });
};

const verifyStock = async (body: IProduct[]) => {
  for (const item of body) {
    const product = await ProductModel.findOne({
      where: { id_product: item.id_product },
    });
    console.log("product:", product);
    if (!product) {
      throw new Error(`Producto con ID ${item.id_product} no encontrado`);
    }
    if (product?.stock < item.stock) {
      throw new Error(`${item.name} no tiene el stock suficiente!!!`);
    }
  }
  return true;
};

export default {
  getSales,
  verifyStock,
};
