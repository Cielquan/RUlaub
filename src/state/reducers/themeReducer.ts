import { ThemeType } from "../action-types";
import { ThemeAction } from "../actions";

const initialState = true;

const reducer = (state: boolean = initialState, action: ThemeAction): boolean => {
  switch (action.type) {
    case ThemeType.DARK:
      return true;
    case ThemeType.LIGHT:
      return false;
    default:
      return state;
  }
};

export default reducer;
