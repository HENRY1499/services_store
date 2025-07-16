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
import { Op, Transaction } from "sequelize";

const getSales = async () => {
  const today = moment().startOf("day");
  const tomorrow = moment(today).add(1, "day");
  return await SalesModel.findAll({
    attributes: ["id_sale", "total", "createdat"],
    where: {
      createdat: {
        [Op.between]: [today.toDate(), tomorrow.toDate()],
      },
    },
    order: [["createdat", "DESC"]],
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
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 00:00:00.000

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // mismo 00:00 de mañana
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
      attributes: ["name", "stock", "users"],
      model: ProductModel,
      include: [
        {
          attributes: ["name"],
          model: CategoryModel,
        },
      ],
    },
    where: {
      createdat: {
        [Op.gte]: today, // >= 2025-07-15 00:00:00
        [Op.lt]: tomorrow,
      },
    },
    order: [["createdat", "DESC"]],
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
        updatedat: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      { transaction: t }
    );

    const detailSales: IDetailSales[] = [];

    for (const item of details) {
      const subtotal = parseFloat(
        (item.sales_price * item.quantity).toFixed(2)
      );

      if (item.pay_method === "" || item.pay_method === null) {
        throw new Error(`Método de pago no seleccionado`);
      }
      if (item.quantity <= 0 || item.quantity === null) {
        throw new Error("Cantidad Vacía");
      }
      if (item.sales_price <= 0 || item.sales_price === null) {
        throw new Error("No colocaste el precio");
      }

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
        throw new Error("No hay stock suficiente para realizar la venta!!!");
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
