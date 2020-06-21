import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { create } from "jss";
import { SnackbarProvider } from "notistack";
import {
  createStyles,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import Auth from "components/Auth";
import SettingsNotification from "components/SettingsNotification";
import ScrollReset from "components/ScrollReset";
import GAListener from "components/GAListener";
import useSettings from "hooks/useSettings.jsx";
import { createTheme } from "theme";
import Routes from 'Routes';

const history = createBrowserHistory();
const jss = create({ plugins: [...jssPreset().plugins] });

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
      },
      body: {
        height: "100%",
        width: "100%",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
    },
  })
);

function App() {
  useStyles();

  const { settings } = useSettings();

  return (
    <ThemeProvider theme={createTheme(settings)}>
      <StylesProvider jss={jss}>
        <SnackbarProvider maxSnack={1}>
          <Router history={history}>
          <GAListener trackingId="UA-169878160-1">
            <Auth>
            <ScrollReset />
            <SettingsNotification />
            <Routes />
            </Auth>
            </GAListener>
          </Router>
        </SnackbarProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
