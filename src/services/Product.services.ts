import moment from "moment";
import { Product } from "../models/Product";
import { IProduct } from "../types/general";
import { Category } from "../models/Category";

const getProduct = async () => {
  return await Product.findAll({
    attributes: { exclude: ["id_category", "updatedat"] },
    include: { attributes: ["name"], model: Category },
  });
};

const postProduct = async (body: IProduct) => {
  const exist_product = await Product.findOne({
    where: { name: body.name },
  });
  if (exist_product) {
    throw new Error("El producto ya existe");
  }
  const newData = await Product.create({
    name: body.name,
    description: body.description,
    id_category: body.id_category,
    sales_price: body.sales_price,
    purchase_price: body.purchase_price,
    stock: body.stock,
    status: body.status,
    createdAt: moment(),
  });

  if (!newData)
    throw new Error("Ocurrio un error al momento de crear el producto !!!");
};

export default {
  postProduct,
  getProduct,
};
