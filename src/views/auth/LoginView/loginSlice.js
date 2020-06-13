import { createSlice } from "@reduxjs/toolkit";

import axios from "utils/axios";
import authService from "services/authService";
//import { AppDispatch, AppThunk } from 'store';

const initialState = {
  user: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.user = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    loginFailure: (state, action) => {},
    logout: (state, action) => {
      state.user = null;
    },
    silentLogin: (state, action) => {
      state.user = action.payload;
    },
    updateProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  silentLogin,
  updateProfile,
} = loginSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const user = await authService.loginWithEmailAndPassword(email, password);

    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure());
    throw error;
  }
};

export const setUserData = (user) => (dispatch) => {
  dispatch(silentLogin(user));
};

export const logOut = () => async (dispatch) => {
  authService.logout();
  dispatch(logout());
};

export const updateProFile = (update) => (dispatch) => {
  const request = axios.post("/api/account/profile", { update });

  return (dispatch) => {
    request.then((response) => dispatch(updateProfile(response.data)));
  };
};

export default loginSlice.reducer;
