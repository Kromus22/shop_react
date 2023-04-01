import { ProductsState, ProductType } from "../../types/products";
import { productsMocks } from "../../mocks/productsMocks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isSubarray } from "../../utils/isSubarray";
import { paginationInitialState } from "./paginationSlice";
import { getProductsFromLocalStorage } from "../../utils/localStorageFunks";

const initialState: ProductsState = {
  list: getProductsFromLocalStorage(),
  listToShow: getProductsFromLocalStorage(),
  pageList: [...productsMocks].slice(0, paginationInitialState.visibleProductsNumber),
  loading: false,
  error: null,
  status: 'idle'
}

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState as ProductsState,
  reducers: {
    sortProducts(state, action: PayloadAction<{ sortParam: string, sortOrder: string }>) {
      const { sortParam, sortOrder } = action.payload;
      const coef = sortOrder === 'asc' ? 1 : -1;
      state.listToShow.sort(function (a, b): number {
        if (sortParam === 'title' || sortParam === 'price') {
          if (a[sortParam] < b[sortParam]) {
            return -1 * coef;
          }
          return 1 * coef;
        }
        return 1;
      });
      state.pageList = state.listToShow.slice(0, paginationInitialState.visibleProductsNumber);
    },
    fetchPageProducts(state, action) {
      const { page, productsNumber } = action.payload;
      const firstProductIndex = (page - 1) * productsNumber;
      const lastProductIndex = productsNumber * page > state.list.length ? state.list.length : productsNumber * page;
      state.pageList = state.list.slice(firstProductIndex, lastProductIndex);
    },
    removeProduct(state, action) {
      const index = state.list.findIndex(item => item.barcode === action.payload);
      state.list.splice(index, 1);
    },
    updateProducts(state) {
      state.list = getProductsFromLocalStorage();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredProducts.pending, (state) => {
      state.status = 'loading';
    }).addCase(fetchFilteredProducts.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'loaded';
      state.listToShow = action.payload.list;
      state.pageList = action.payload.pageList;

    }).addCase(fetchFilteredProducts.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'loaded';
      state.error = action.payload;
    })
  }
});

type FetchProductsParamsType = {
  maxPrice: string;
  minPrice: string;
  selectedManufacturers: string[];
  careTypes: string[];
  shownProductsNumber: number;
  page: number;
  sortParams?: {
    order: string,
    param: string
  }
}

export const fetchFilteredProducts = createAsyncThunk('products/fetchProducts', async (params: FetchProductsParamsType) => {
  const { page, maxPrice, minPrice, selectedManufacturers, shownProductsNumber, careTypes, sortParams } = params;
  let allProducts: ProductType[] = getProductsFromLocalStorage();
  if (allProducts === null) {
    allProducts = [...productsMocks];
  }
  if (sortParams) {
    allProducts.sort((a, b) => {
      const coef = sortParams.order === 'asc' ? 1 : -1;
      if (sortParams.param === 'title') {
        if (a.title < b.title) {
          return -1 * coef;
        } else {
          return 1 * coef;
        }
      } else if (sortParams.param === 'price') {
        if (a.price < b.price) {
          return -1 * coef;
        } else {
          return 1 * coef;
        }
      }
      return 1;
    });
  }

  if (params.maxPrice !== '') {
    allProducts = allProducts.filter(product => product.price <= +maxPrice);
  }

  if (params.minPrice !== '') {
    allProducts = allProducts.filter(product => product.price >= +minPrice);
  }

  if (params.selectedManufacturers.length !== 0) {
    allProducts = allProducts.filter(product => selectedManufacturers.includes(product.manufacturer));
  }

  if (params.careTypes.length !== 0) {
    allProducts = allProducts.filter(product => isSubarray(product.careTypes, careTypes));
  }

  const firstProductIndex = (page - 1) * shownProductsNumber;
  const lastProductIndex = shownProductsNumber * page > allProducts.length ? allProducts.length : shownProductsNumber * page;

  const productsToShow = allProducts.slice(firstProductIndex, lastProductIndex);


  const listPromise = new Promise(resolve => {
    setTimeout(() => resolve({
      list: allProducts,
      pageList: productsToShow
    }), 700);
  });

  return listPromise;
});

export const {
  sortProducts,
  fetchPageProducts,
  removeProduct,
  updateProducts
} = productsSlice.actions;

export default productsSlice.reducer;