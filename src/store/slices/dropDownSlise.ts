import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  isOpen: false
}

const dropDownSlice = createSlice({
  name: 'lock',
  initialState,
  reducers: {
    closeDropDown(state) {
      state.isOpen = false;
    },
    openDropDown(state) {
      state.isOpen = true;
    }
  }
});

export const {
  closeDropDown,
  openDropDown
} = dropDownSlice.actions;

export default dropDownSlice.reducer;