import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productsReducer from "./slices/productSlice";
import filtersReducer from "./slices/filterSlice";
import paginationReducer from "./slices/paginationSlice";
import sortReducer from "./slices/sortSlice";
import dropDownReducer from "./slices/dropDownSlise";
import cartReducer from "./slices/cartSlice";
import { localStorageActions } from "./middlewares/localStorageActions";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    pagination: paginationReducer,
    sort: sortReducer,
    dropDown: dropDownReducer,
    cart: cartReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageActions)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;