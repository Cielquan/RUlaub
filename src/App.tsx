import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import * as locales from "@material-ui/core/locale";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

import { State } from "./state";
import useStyles from "./styles";
import createTheme from "./theme";

import InfoPage from "./components/InfoPage";
import Navbar from "./components/Navbar";
import NewHolidayButton from "./components/NewHolidayButton";
import SideMenu from "./components/SideMenu";
import Calendar from "./components/Calendar";

export async function dynamicActivate(locale: string): Promise<void> {
  const { messages } = await import(`./locales/${locale}/messages`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

function App(): ReactElement {
  const darkState = useSelector((state: State) => state.darkTheme);
  const langState = useSelector((state: State) => state.language);

  const theme = createTheme(darkState, locales[langState.importName]);
  const classes = useStyles();

  useEffect(() => {
    dynamicActivate(langState.locale);
  }, [langState.locale]);

  return (
    <I18nProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Navbar />
          <SideMenu />
          <main className={classes.content}>
            <Calendar theme={theme} />
            <NewHolidayButton />
          </main>
        </div>
        <InfoPage />
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
