import moment from "moment";
import { Category } from "../models/Association";
import { ICategory } from "../types/general";

const getCategory = async () => {
  return await Category.findAll({
    attributes: [["id_categories", "idc"], "name", "createdat"],
  });
};

const postCategory = async (body: ICategory) => {
  const exist_category = await Category.findOne({
    where: { name: body.name },
  });
  if (exist_category) {
    throw new Error("La categoria ya existe!!!");
  }
  const category = await Category.create({
    name: body.name,
    image: body.image,
    createdat: moment(),
  });

  if (!category) throw new Error("Hubo un error al registrar la categoria!!!");
  // return category;
};

export default {
  postCategory,
  getCategory,
};
