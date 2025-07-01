export interface ICategory {
  id_categories: number;
  name: string;
  image: string;
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
  id_category: number;
  status: number;
  createdat: Date;
  updatedat: Date;
}

export interface ISales {
  id_sale: number;
  total: string;
  status: number;
  createdat: string;
  updatedat: string;
}

// interface para los datos que se reciben desde el cliente
export interface ISaleDetailInput {
  id_product: number;
  sales_price: number;
  quantity: number;
  pay_method: string;
  createdat: string;
}

export interface IDetailSales {
  id_detail: number;
  id_product: number;
  sales_price: number;
  quantity: string;
  id_sale: number;
  subtotal: string;
  createdat: string;
}

export interface ISaleCreationResult {
  sale: any; // o una interfaz específica si la tenés
  detailSales: IDetailSales[];
}
