import { I18nProvider } from "@lingui/react";
import * as locales from "@material-ui/core/locale";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import i18n from "./i18n";
import { actionCreators, State } from "./state";
import createTheme from "./theme";
import { useMountEffect } from "./utils/reactUtils";

import App from "./App";

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
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </I18nProvider>
  );
};

export default ProviderWrapper;
