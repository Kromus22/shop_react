import { createSlice } from "@reduxjs/toolkit"
import { FilterState } from "../../types/filter"

const initialState: FilterState = {
  price_min: '',
  price_max: '',
  manufacturersList: [],
  careTypes: []
}

const filterSlice = createSlice({
  name: 'filters',
  initialState: initialState as FilterState,
  reducers: {
    setCareTypesFilter(state, action) {
      state.careTypes = action.payload;
    },
    setFilters(state, action) {
      state.manufacturersList = action.payload.list;
      state.price_min = action.payload.price_min;
      state.price_max = action.payload.price_max;
    },
    resetFilters(state) {
      state.careTypes = [];
      state.price_max = '';
      state.price_min = '';
      state.manufacturersList = [];
    }
  }
});

export const {
  setCareTypesFilter,
  setFilters,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;