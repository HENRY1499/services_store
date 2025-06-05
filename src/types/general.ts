export interface ICategory {
  id_categories: number;
  name: string;
  image: string;
  status: number;
  createdat: string;
  updatedat: string;
}
export interface IProduct {
  id_product: number;
  name: string;
  description: string;
  sales_price: string;
  purchase_price: string;
  stock: number;
  id_category: number;
  status: number;
  createdat: Date;
  updatedat: Date;
}

export interface ISales {
  id_sales: number;
  total: string;
  status: number;
  createdat: string;
  updatedat: string;
}

export interface IDetails_sales {
  id_detail: number;
  id_product: IProduct;
  id_sale: ISales;
  sales_price: number;
  quantity: string;
  subtotal: string;
}
