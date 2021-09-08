import { ThemeType } from "../action-types";
import { ThemeAction } from "../actions";
import { themeInitState as initState } from "./initialStates";
import { SupportedThemes } from "../../theme";

const reducer = (
  state: SupportedThemes = initState,
  action: ThemeAction
): SupportedThemes => {
  switch (action.type) {
    case ThemeType.DARK:
      return "dark";
    case ThemeType.LIGHT:
      return "light";
    default:
      return state;
  }
};

export default reducer;
