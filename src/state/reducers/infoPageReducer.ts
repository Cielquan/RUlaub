import { InfoPageActionType } from "../action-types";
import { InfoPageAction } from "../actions";
import { infoPageInitState as initState } from "./initialStates";

const reducer = (state: boolean = initState, action: InfoPageAction): boolean => {
  switch (action.type) {
    case InfoPageActionType.OPEN:
      return true;
    case InfoPageActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
