import { combineReducers } from "@reduxjs/toolkit";

import login from "views/auth/LoginView/loginSlice";

const rootReducer = combineReducers({
  login,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
