import { deepOrange, deepPurple, lightBlue, orange } from "@mui/material/colors";
import darkScrollbar from "@mui/material/darkScrollbar";
import { Localization } from "@mui/material/locale";
import { Theme, createTheme as createMuiTheme } from "@mui/material/styles";

import { SupportedThemes } from "./backendAPI/types/configFile.schema";

const createTheme = (themeState: SupportedThemes, language: Localization): Theme => {
  const palletType = themeState;

  return createMuiTheme(
    {
      palette: {
        mode: palletType,
        primary: {
          main: themeState === "dark" ? orange[500] : lightBlue[500],
        },
        secondary: {
          main: themeState === "dark" ? deepOrange[900] : deepPurple[500],
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: themeState === "dark" ? darkScrollbar() : null,
          },
        },
      },
    },
    language
  );
};

export default createTheme;
