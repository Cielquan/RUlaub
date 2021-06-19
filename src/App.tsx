import React from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { State } from "./state";
import createDarkTheme from "./theme";
import Navbar from "./components/Navbar";

function App(): React.ReactElement {
  const darkState = useSelector((state: State) => state.darkTheme);

  const theme = createDarkTheme(darkState);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Navbar title="RUlaub" />
        <div> {darkState ? "dark" : "light"} </div>
      </ThemeProvider>
    </>
  );
}

export default App;
