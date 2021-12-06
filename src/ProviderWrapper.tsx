import { I18nProvider } from "@lingui/react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import * as locales from "@mui/material/locale";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import setupMenuEventListeners from "./backendAPI/eventListeners/menu";
import i18n, { localeMap } from "./i18n";
import { useMountEffect } from "./hooks";
import { actionCreators, State } from "./state";
import createTheme from "./theme";

import App from "./App";

const ProviderWrapper = (): ReactElement => {
  const dispatch = useDispatch();
  const {
    loadConfig,
    loadPublicHolidaysData,
    loadSchoolHolidaysData,
    loadUsersData,
    loadVacationTypesData,
  } = bindActionCreators(actionCreators, dispatch);

  const configState = useSelector((state: State) => state.config);
  const themeState = configState.settings.theme;
  const langState = configState.settings.language;

  const theme = createTheme(themeState, locales[langState.importName]);

  useEffect(() => {
    i18n.activate(langState.locale);
  }, [langState.locale]);

  useMountEffect(() => {
    loadConfig();
    loadPublicHolidaysData();
    loadSchoolHolidaysData();
    loadUsersData();
    loadVacationTypesData();
    setupMenuEventListeners(dispatch);
  });

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[langState.locale]}
    >
      <I18nProvider i18n={i18n}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </I18nProvider>
    </LocalizationProvider>
  );
};

export default ProviderWrapper;
