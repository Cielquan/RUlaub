import { CssBaseline } from "@mui/material";
import React, { ReactElement } from "react";

import useStyles from "./styles";

import Calendar from "./components/Calendar";
import InfoPage from "./components/InfoPage";
import Navbar from "./components/Navbar";
import NewHolidayButton from "./components/NewHolidayButton";
import SideMenu from "./components/SideMenu";

const App = (): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div data-testid="rulaub-root" className={classes.root}>
        <Navbar />
        <SideMenu />
        <main data-testid="rulaub-main" className={classes.content}>
          <Calendar />
          <NewHolidayButton />
        </main>
      </div>
      <InfoPage />
    </>
  );
};

export default App;
