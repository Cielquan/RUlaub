import { InfoPageType } from "../action-types";
import { InfoPageAction } from "../actions";
import { infoPageInitState as initState } from "./initialStates";

const reducer = (state: boolean = initState, action: InfoPageAction): boolean => {
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
