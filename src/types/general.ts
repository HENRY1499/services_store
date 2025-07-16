export interface ICategory {
  id_categories: number;
  name: string;
  status: number;
  createdat: Date;
  updatedat: Date;
}
export interface IProduct {
  id_product: number;
  name: string;
  description: string;
  sales_price: number;
  purchase_price: number;
  stock: number;
  users: number;
  id_category: number;
  status: string;
  createdat: Date;
  updatedat: Date;
}

export interface ISales {
  id_sale: number;
  total: number;
  status: number;
  createdat: Date;
  updatedat?: Date;
}

// interface para los datos que se reciben desde el cliente
export interface ISaleDetailInput {
  id_product: number;
  sales_price: number;
  quantity: number;
  pay_method: string;
  createdat: Date;
}

export interface IDetailSales {
  id_detail: number;
  id_product: number;
  sales_price: number;
  quantity: number;
  id_sale: number;
  subtotal: number;
  pay_method: string;
  createdat: Date;
}

export interface ISaleCreationResult {
  sale: ISales;
  detailSales: IDetailSales[];
}
