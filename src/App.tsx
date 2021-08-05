import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { CssBaseline } from "@material-ui/core";
import * as locales from "@material-ui/core/locale";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators, State } from "./state";
import useStyles from "./styles";
import createTheme from "./theme";
import { useMountEffect } from "./utils/reactUtils";

import Calendar from "./components/Calendar";
import InfoPage from "./components/InfoPage";
import Navbar from "./components/Navbar";
import NewHolidayButton from "./components/NewHolidayButton";
import SideMenu from "./components/SideMenu";

const App = (): ReactElement => {
  const dispatch = useDispatch();
  const { loadLangState, loadThemeState } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const themeState = useSelector((state: State) => state.theme);
  const langState = useSelector((state: State) => state.language);

  const theme = createTheme(themeState, locales[langState.importName]);
  const classes = useStyles();

  useMountEffect(() => {
    loadLangState();
    loadThemeState();
  });

  useEffect(() => {
    i18n.activate(langState.locale);
  }, [langState.locale]);

  return (
    <I18nProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </I18nProvider>
  );
};

export default App;
