import { ProductModel } from "../models/Product";
import {
  IDetailSales,
  IProduct,
  ISaleCreationResult,
  ISaleDetailInput,
} from "../types/general";
import {
  CategoryModel,
  DetailSaleModel,
  SalesModel,
} from "../models/Association";
import moment from "moment";
import { db_project } from "../configuration/database";
import { Transaction, where } from "sequelize";

const getSales = async () => {
  return await SalesModel.findAll({
    attributes: [["id_sale", "sid"], "total", "createdat"],
  });
};

const verifyStock = async (body: IProduct[]) => {
  for (const item of body) {
    const product = await ProductModel.findOne({
      where: { id_product: item.id_product },
    });
    if (!product) {
      throw new Error(`Producto con ID ${item.id_product} no encontrado`);
    }
    if (product?.stock < item.stock) {
      throw new Error(`${item.name} no tiene el stock suficiente!!!`);
    }
  }
  return true;
};

const getDestails = async () => {
  const salesDetails = await DetailSaleModel.findAll({
    attributes: [
      ["id_detail", "deid"],
      "quantity",
      "subtotal",
      "sales_price",
      "pay_method",
      "createdat",
    ],
    include: {
      attributes: ["name"],
      model: ProductModel,
      include: [
        {
          attributes: ["name"],
          model: CategoryModel,
        },
      ],
    },
  });
  return salesDetails;
};

const createSales = async (
  details: ISaleDetailInput[]
): Promise<ISaleCreationResult> => {
  // sumamos el total
  const total = details.reduce(
    (acc, item) => acc + item.sales_price * item.quantity,
    0
  );

  const t: Transaction = await db_project.transaction();

  try {
    const sale = await SalesModel.create(
      {
        total: parseFloat(total.toFixed(2)),
        status: 1,
        createdat: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      { transaction: t }
    );

    const detailSales: IDetailSales[] = [];

    for (const item of details) {
      const subtotal = parseFloat(
        (item.sales_price * item.quantity).toFixed(2)
      );
      // agregamos el detalle a la tabla details_sales
      const created = await DetailSaleModel.create(
        {
          id_sale: sale.id_sale,
          id_product: item.id_product,
          sales_price: item.sales_price,
          quantity: item.quantity,
          pay_method: item.pay_method,
          subtotal,
          createdat: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        { transaction: t }
      );
      const detail = created.get({ plain: true });

      detailSales.push({
        id_detail: detail.id_detail,
        id_product: created.id_product,
        quantity: created.quantity,
        sales_price: created.sales_price,
        id_sale: sale.id_sale,
        subtotal,
        pay_method: detail.pay_method,
        createdat: created.createdat,
      });

      const product = await ProductModel.findOne({
        where: { id_product: created.id_product },
      });

      if (!product) {
        throw new Error(`Producto con ID ${item.id_product} no encontrado`);
      }
      if (product?.stock < created.quantity) {
        throw new Error("No hay estoy suficiente para realizar la venta!!!");
      }

      await ProductModel.update(
        { stock: db_project.literal(`stock - ${created.quantity}`) },
        { where: { id_product: created.id_product } }
      );
    }
    await t.commit();
    return { sale, detailSales };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export default {
  getSales,
  verifyStock,
  createSales,
  getDestails,
};
