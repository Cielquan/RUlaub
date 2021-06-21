import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { orange, lightBlue, deepOrange, deepPurple } from "@material-ui/core/colors";
import { Localization } from "@material-ui/core/locale";

const createTheme = (darkState: boolean, language: Localization): Theme => {
  const palletType = darkState ? "dark" : "light";

  return createMuiTheme(
    {
      palette: {
        type: palletType,
        primary: {
          main: darkState ? orange[500] : lightBlue[500],
        },
        secondary: {
          main: darkState ? deepOrange[900] : deepPurple[500],
        },
      },
    },
    language
  );
};

export default createTheme;
