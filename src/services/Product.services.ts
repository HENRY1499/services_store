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
    users: body.stock,
    status: body.status,
    createdat: moment().toDate(),
  });

  if (!newData)
    throw new Error("Ocurrio un error al momento de crear el producto !!!");
};

const updatedProduct = async (body: IProduct) => {
  const product = await ProductModel.findOne({
    where: { id_product: body.id_product },
  });
  if (!product) {
    throw new Error("Error al encontrar producto");
  }
  const updatedProduct = await ProductModel.update(
    {
      name: body.name,
      description: body.description,
      id_category: body.id_category,
      sales_price: body.sales_price,
      purchase_price: body.purchase_price,
      stock: body.stock,
      status: body.status,
      updatedat: moment().toDate(),
    },
    { where: { id_product: body.id_product } }
  );
  if (!updatedProduct) {
    throw new Error("No se pudo actualizar el producto");
  }
};

export default {
  postProduct,
  getProduct,
  updatedProduct,
};
