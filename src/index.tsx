import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "react-perfect-scrollbar/dist/css/styles.css";
import "nprogress/nprogress.css";
import 'mock';
import React from "react";
import ReactDOM from "react-dom";
import Provider from "react-redux/es/components/Provider";
import * as serviceWorker from "./serviceWorker";
import { SettingsProvider } from "context/SettingsContext";
import store from "store";
import { restoreSettings } from "utils/settings";
import App from "./App";

const settings = restoreSettings();

ReactDOM.render(
  <Provider store={store}>
    <SettingsProvider settings={settings}>
      <App />
    </SettingsProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
