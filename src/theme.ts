import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { orange, lightBlue, deepOrange, deepPurple } from "@material-ui/core/colors";

const createTheme = (darkState: boolean): Theme => {
  const palletType = darkState ? "dark" : "light";

  return createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: darkState ? orange[500] : lightBlue[500],
      },
      secondary: {
        main: darkState ? deepOrange[900] : deepPurple[500],
      },
    },
  });
};

export default createTheme;
