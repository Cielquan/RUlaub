import React, { ReactElement, useEffect } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import * as locales from "@material-ui/core/locale";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

import { actionCreators, State } from "./state";
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
  const dispatch = useDispatch();
  const { useDarkTheme, useLightTheme } = bindActionCreators(actionCreators, dispatch);
  const themeState = useSelector((state: State) => state.theme);
  const langState = useSelector((state: State) => state.language);
  const localConfigState = useSelector((state: State) => state.localConfig);

  const theme = createTheme(themeState, locales[langState.importName]);
  const classes = useStyles();

  useEffect(() => {
    dynamicActivate(langState.locale);
  }, [langState.locale]);

  useEffect(() => {
    if (localConfigState.settings.theme !== themeState) {
      (localConfigState.settings.theme === "dark" ? useDarkTheme : useLightTheme)();
    }
    // Empty array is need to run hook only on first
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
