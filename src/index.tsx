import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "./state";

import ConfigLoader from "./ConfigLoader";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ConfigLoader />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
