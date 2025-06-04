export interface ICategory {
  id_categories: number;
  name: string;
  image: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}
export interface IProduct {
  id_product: number;
  name: string;
  description: string;
  sales_price: string;
  purchase_price: string;
  stock: number;
  id_category: ICategory;
  status: number;
  createdAt: string;
  updatedAt: string;
}
