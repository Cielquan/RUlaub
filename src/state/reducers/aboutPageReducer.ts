import { AboutPageActionType } from "../action-types";
import { AboutPageAction } from "../actions";
import { aboutPageInitState as initState } from "./initialStates";

const reducer = (state: boolean = initState, action: AboutPageAction): boolean => {
  switch (action.type) {
    case AboutPageActionType.OPEN:
      return true;
    case AboutPageActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
