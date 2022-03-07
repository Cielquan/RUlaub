import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import BackendLoader from "./BackendLoader";
import { store } from "./state";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BackendLoader />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
