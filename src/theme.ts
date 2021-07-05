import { createMuiTheme, Theme } from "@material-ui/core/styles";
import {
  deepOrange,
  deepPurple,
  grey,
  lightBlue,
  orange,
} from "@material-ui/core/colors";
import { Localization } from "@material-ui/core/locale";

export type SupportedThemes = "dark" | "light";

const createTheme = (themeState: SupportedThemes, language: Localization): Theme => {
  const palletType = themeState;

  return createMuiTheme(
    {
      palette: {
        type: palletType,
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
    },
    language
  );
};

export default createTheme;
