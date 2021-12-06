import { I18nProvider } from "@lingui/react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import * as locales from "@mui/material/locale";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import i18n, { localeMap } from "./i18n";
import { State } from "./state";
import createTheme from "./theme";

import SetupWrapper from "./SetupWrapper";

const ProviderWrapper = (): ReactElement => {
  const configState = useSelector((state: State) => state.config);
  const themeState = configState.settings.theme;
  const langState = configState.settings.language;

  const theme = createTheme(themeState, locales[langState.importName]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[langState.locale]}
    >
      <I18nProvider i18n={i18n}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3} preventDuplicate>
              <SetupWrapper />
            </SnackbarProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </I18nProvider>
    </LocalizationProvider>
  );
};

export default ProviderWrapper;
