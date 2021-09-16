import { I18nProvider } from "@lingui/react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import * as locales from "@mui/material/locale";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";

import i18n from "./i18n";
import { State } from "./state";
import createTheme from "./theme";

import App from "./App";

const ProviderWrapper = (): ReactElement => {
  const configState = useSelector((state: State) => state.config);
  const themeState = configState.settings.theme;
  const langState = configState.settings.language;

  const theme = createTheme(themeState, locales[langState.importName]);

  useEffect(() => {
    i18n.activate(langState.locale);
  }, [langState.locale]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <I18nProvider i18n={i18n}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </I18nProvider>
    </LocalizationProvider>
  );
};

export default ProviderWrapper;
