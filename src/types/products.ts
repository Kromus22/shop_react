export interface ProductType {
  image_url: string,
  title: string,
  sizeType: sizeTypes.volume | sizeTypes.weight,
  size: number | string,
  barcode: string,
  manufacturer: string,
  brand: string,
  description: string,
  price: number,
  careTypes: string[]
}

export enum sizeTypes {
  volume = 'volume',
  weight = 'weight',
}

export interface ProductsState {
  list: ProductType[];
  listToShow: ProductType[];
  pageList: ProductType[];
  loading: boolean;
  error: null | string;
  status: 'loading' | 'loaded' | 'failed' | 'idle';
}

export enum ProductsActionTypes {
  fetch_products = 'fetch_products',
  fetch_products_success = 'fetch_products_success',
  fetch_products_error = 'fetch_products_error'
}

interface FetchProductsAction {
  type: ProductsActionTypes.fetch_products;
}
interface FetchProductsSuccessAction {
  type: ProductsActionTypes.fetch_products_success;
  payload: any[];
}
interface FetchProductsErrorAction {
  type: ProductsActionTypes.fetch_products_error;
  payload: string;
}

export type ProductsAction = FetchProductsAction | FetchProductsSuccessAction | FetchProductsErrorAction;
