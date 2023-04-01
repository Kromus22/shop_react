import { createSlice } from "@reduxjs/toolkit";

export const paginationInitialState = {
  visibleProductsNumber: 10,
  currentPage: 1
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: paginationInitialState,
  reducers: {
    setVisibleProductsNumber(state, action) {
      state.visibleProductsNumber = action.payload;
    },
    setPageTo(state, action) {
      state.currentPage = action.payload;
    }
  }
});

export const {
  setVisibleProductsNumber,
  setPageTo
} = paginationSlice.actions;

export default paginationSlice.reducer;