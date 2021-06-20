import { InfoPageType } from "../action-types";
import { InfoPageAction } from "../actions";

const initialState = false;

const reducer = (state: boolean = initialState, action: InfoPageAction): boolean => {
  switch (action.type) {
    case InfoPageType.OPEN:
      return true;
    case InfoPageType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
