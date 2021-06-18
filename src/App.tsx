import React from "react";
import { CssBaseline } from "@material-ui/core";
import Navbar from "./components/Navbar";

function App(): React.ReactElement {
  return (
    <>
      <CssBaseline />
      <Navbar title="RUlaub" />
    </>
  );
}

export default App;
