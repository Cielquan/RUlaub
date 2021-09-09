import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "./state";

import ProviderWrapper from "./ProviderWrapper";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ProviderWrapper />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
