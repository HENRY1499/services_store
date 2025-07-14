import moment from "moment";
import { CategoryModel } from "../models/Association";
import { ICategory } from "../types/general";

const getCategory = async () => {
  return await CategoryModel.findAll({
    attributes: [["id_categories", "cid"], "image", "name", "rol", "createdat"],
  });
};

const postCategory = async (body: ICategory) => {
  const exist_category = await CategoryModel.findOne({
    where: { name: body.name },
  });

  if (exist_category) {
    throw new Error("La categoria ya existe!!!");
  }
  if (body.rol === undefined) {
    throw new Error("Selecciona el rol");
  }
  const category = await CategoryModel.create({
    name: body.name,
    rol: body.rol,
    status: body.status,
    createdat: moment().format("YYYY-MM-DD HH:mm:ss"),
    updatedat: moment().format("YYYY-MM-DD HH:mm:ss"),
  });

  if (!category) throw new Error("Hubo un error al registrar la categoria!!!");
  // return category;
};
const updatedCategory = async (body: ICategory) => {
  const category = await CategoryModel.findOne({
    attributes: ["name"],
    where: {
      id_categories: body.id_categories,
    },
  });
  if (!category) {
    throw new Error("No se encontro la categoria");
  }
  const updatedCategory = await CategoryModel.update(
    {
      name: body.name,
    },
    { where: { id_categories: body.id_categories } }
  );
  if (!updatedCategory) {
    throw new Error("Ocurrio un error al actualizar Categoria.");
  }
};
export default {
  postCategory,
  getCategory,
  updatedCategory,
};
