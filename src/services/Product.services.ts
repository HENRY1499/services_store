import moment from "moment";
import { ProductModel } from "../models/Product";
import { IProduct } from "../types/general";
import { CategoryModel } from "../models/Category";

const getProduct = async () => {
  return await ProductModel.findAll({
    attributes: { exclude: ["id_category", "updatedat"] },
    include: { attributes: ["name"], model: CategoryModel },
  });
};

const postProduct = async (body: IProduct) => {
  const exist_product = await ProductModel.findOne({
    where: { name: body.name },
  });
  if (exist_product) {
    throw new Error("El producto ya existe");
  }
  const newData = await ProductModel.create({
    name: body.name,
    description: body.description,
    id_category: body.id_category,
    sales_price: body.sales_price,
    purchase_price: body.purchase_price,
    stock: body.stock,
    status: body.status,
    createdat: moment().toDate(),
  });

  if (!newData)
    throw new Error("Ocurrio un error al momento de crear el producto !!!");
};

export default {
  postProduct,
  getProduct,
};
