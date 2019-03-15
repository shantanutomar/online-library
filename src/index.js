import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import createStore from "./Store/Reducers/createStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#377CFD"
    },
    secondary: {
      main: "#FFFFFF"
    }
  },
  typography: {
    useNextVariants: true
  }
});

let { store, persistor } = createStore();

const app = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
