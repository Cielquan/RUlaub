import React from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { State } from "./state";
import useStyles from "./styles";
import createTheme from "./theme";

import InfoPage from "./components/InfoPage";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";

function App(): React.ReactElement {
  const darkState = useSelector((state: State) => state.darkTheme);

  const theme = createTheme(darkState);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Navbar title="RUlaub" />
        <SideMenu />
        <main className={classes.content}>
          <div className={classes.navbarSpacer} />
          <div> {darkState ? "dark" : "light"} </div>
        </main>
      </div>
      <InfoPage />
    </ThemeProvider>
  );
}

export default App;
