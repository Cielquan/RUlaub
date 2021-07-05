import { ThemeType } from "../action-types";
import { ThemeAction } from "../actions";
import { SupportedThemes } from "../../theme";

const initialState: SupportedThemes = "dark";

const reducer = (
  state: SupportedThemes = initialState,
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
