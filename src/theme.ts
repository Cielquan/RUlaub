import { deepOrange, deepPurple, grey, lightBlue, orange } from "@mui/material/colors";
import darkScrollbar from "@mui/material/darkScrollbar";
import { Localization } from "@mui/material/locale";
import { createTheme as createMuiTheme, Theme } from "@mui/material/styles";

export type SupportedThemes = "dark" | "light";

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
        background: {
          paper: themeState === "dark" ? grey[700] : grey[300],
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
