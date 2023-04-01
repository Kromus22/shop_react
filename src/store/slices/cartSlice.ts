import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../types/cart";

const initialState: CartState = {
  productsInCart: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const { product, quantity } = action.payload;
      const index = state.productsInCart.findIndex(item => item.product.barcode === product.barcode);
      if (index !== -1) {
        state.productsInCart[index].quantity += +quantity;
      } else {
        state.productsInCart.push({ product, quantity: +quantity });
      }
    },
    removeProductFromCart(state, action) {
      const barcode = action.payload;
      const index = state.productsInCart.findIndex(item => item.product.barcode === barcode);
      state.productsInCart.splice(index, 1);
    },
    removeAllProductsFromCart(state) {
      state.productsInCart.splice(0, state.productsInCart.length);
    },
    changeQuantityInCart(state, action) {
      const { barcode, count } = action.payload;
      const index = state.productsInCart.findIndex(item => item.product.barcode === barcode);
      if (index !== -1) {
        state.productsInCart[index].quantity = count;
      }
    }
  }
});

export const {
  addProductToCart,
  removeProductFromCart,
  removeAllProductsFromCart,
  changeQuantityInCart
} = cartSlice.actions;

export default cartSlice.reducer;