import { combineReducers } from "@reduxjs/toolkit";

import login from "views/auth/LoginView/loginSlice";
import account from "views/pages/AccountView/accountSlice";

const rootReducer = combineReducers({
  login,
  account
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
