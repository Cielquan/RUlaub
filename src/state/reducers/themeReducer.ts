import { ThemeType } from "../action-types";
import { ThemeAction } from "../actions";

const initialState = "dark";

const reducer = (state: string = initialState, action: ThemeAction): string => {
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
