import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { CssBaseline } from "@material-ui/core";
import * as locales from "@material-ui/core/locale";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import Languages from "./i18n";
import createTheme from "./theme";
import { State } from "./state";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  dbData: { users: [] },
  infoPage: false,
  language: Languages.english,
  localConfig: { settings: { yearToShow: 2021 } },
  sideMenu: false,
  sideMenuDatabase: false,
  theme: "dark",
});

export const StoreProvider: React.FC = ({ children }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
);

const AllProviders: React.FC = ({ children }) => {
  const themeState = useSelector((state: State) => state.theme);
  const langState = useSelector((state: State) => state.language);

  const theme = createTheme(themeState, locales[langState.importName]);

  return (
    <StoreProvider>
      <I18nProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </I18nProvider>
    </StoreProvider>
  );
};

export default AllProviders;
