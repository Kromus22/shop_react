import { ProductType } from "./products";

export interface CartState {
  productsInCart: { product: ProductType, quantity: number }[];
}