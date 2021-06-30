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
import NewHolidayButton from "./components/NewHolidayButton";
import SideMenu from "./components/SideMenu";

import Calendar from "./components/Calendar";

function App(): JSX.Element {
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
          <Calendar />
          <NewHolidayButton />
        </main>
      </div>
      <InfoPage />
    </ThemeProvider>
  );
}

export default App;
