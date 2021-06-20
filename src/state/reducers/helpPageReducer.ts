import { HelpPageType } from "../action-types";
import { HelpPageAction } from "../actions";

const initialState = false;

const reducer = (state: boolean = initialState, action: HelpPageAction): boolean => {
  switch (action.type) {
    case HelpPageType.OPEN:
      return true;
    case HelpPageType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
