import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortState } from "../../types/sort";

const initialState: SortState = {
  order: 'asc',
  param: 'title'
}

const sortSlice = createSlice({
  name: 'sort',
  initialState: initialState as SortState,
  reducers: {
    setSortState(state, action: PayloadAction<{ order: string, param: string }>) {
      if (action.payload.order === 'asc' || action.payload.order === 'desc') {
        state.order = action.payload.order;
      }
      if (action.payload.param === 'title' || action.payload.param === 'price') {
        state.param = action.payload.param;
      }
    }
  }
});

export const {
  setSortState
} = sortSlice.actions;

export default sortSlice.reducer;