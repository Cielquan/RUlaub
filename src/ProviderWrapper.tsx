import { I18nProvider } from "@lingui/react";
import * as locales from "@mui/material/locale";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material/styles";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import i18n from "./i18n";
import { actionCreators, State } from "./state";
import createTheme from "./theme";
import { useMountEffect } from "./utils/reactUtils";

import App from "./App";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const ProviderWrapper = (): ReactElement => {
  const dispatch = useDispatch();
  const { loadLangState, loadThemeState } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const themeState = useSelector((state: State) => state.theme);
  const langState = useSelector((state: State) => state.language);

  const theme = createTheme(themeState, locales[langState.importName]);

  useMountEffect(() => {
    loadLangState();
    loadThemeState();
  });

  useEffect(() => {
    i18n.activate(langState.locale);
  }, [langState.locale]);

  return (
    <I18nProvider i18n={i18n}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </I18nProvider>
  );
};

export default ProviderWrapper;
