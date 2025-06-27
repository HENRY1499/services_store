import moment from "moment";
import { CategoryModel } from "../models/Association";
import { ICategory } from "../types/general";

const getCategory = async () => {
  return await CategoryModel.findAll({
    attributes: [["id_categories", "idc"], "name", "createdat"],
  });
};

const postCategory = async (body: ICategory) => {
  const exist_category = await CategoryModel.findOne({
    where: { name: body.name },
  });
  if (exist_category) {
    throw new Error("La categoria ya existe!!!");
  }
  const category = await CategoryModel.create({
    name: body.name,
    image: body.image,
    status: body.status,
    createdat: moment().toDate(),
  });

  if (!category) throw new Error("Hubo un error al registrar la categoria!!!");
  // return category;
};

export default {
  postCategory,
  getCategory,
};
