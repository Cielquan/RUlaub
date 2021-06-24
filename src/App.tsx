import React from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import * as locales from "@material-ui/core/locale";

import { State } from "./state";
import useStyles from "./styles";
import createTheme from "./theme";

import InfoPage from "./components/InfoPage";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";

function App(): React.ReactElement {
  const darkState = useSelector((state: State) => state.darkTheme);
  const langState = useSelector((state: State) => state.language);

  const theme = createTheme(darkState, locales[langState.locale]);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Navbar />
        <SideMenu />
        <main className={classes.content}>
          <div className={classes.navbarSpacer} />
          <div> {darkState ? "dark" : "light"} </div>
          <div> {langState.locale} </div>
        </main>
      </div>
      <InfoPage />
    </ThemeProvider>
  );
}

export default App;
