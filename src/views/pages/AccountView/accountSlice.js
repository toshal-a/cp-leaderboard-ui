import { createSlice } from "@reduxjs/toolkit";
//import { AppDispatch, AppThunk } from 'store';

const initialState = {
    newMessageOpen: false
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    openNewMessage: (state, action) => {
        state.newMessageOpen = true;
    },
    closeNewMessage: (state, action) => {
        state.newMessageOpen = false;
    }
  },
});

export const {
  openNewMessage,
  closeNewMessage
} = accountSlice.actions;

export default accountSlice.reducer;
