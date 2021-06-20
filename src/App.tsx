import React from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { State } from "./state";
import useStyles from "./styles";
import createDarkTheme from "./theme";
import { Navbar, SideMenu } from "./components";

function App(): React.ReactElement {
  const darkState = useSelector((state: State) => state.darkTheme);

  const classes = useStyles();
  const theme = createDarkTheme(darkState);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Navbar title="RUlaub" />
          <SideMenu />
          <main className={classes.content}>
            <div className={classes.navbarSpacer} />
            <div> {darkState ? "dark" : "light"} </div>
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
