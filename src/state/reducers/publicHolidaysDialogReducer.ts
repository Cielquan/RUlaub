import { PublicHolidaysDialogActionType } from "../action-types";
import { PublicHolidaysDialogAction } from "../actions";
import { publicHolidaysDialogInitState as initState } from "./initialStates";

const reducer = (
  state: boolean = initState,
  action: PublicHolidaysDialogAction
): boolean => {
  switch (action.type) {
    case PublicHolidaysDialogActionType.OPEN:
      return true;
    case PublicHolidaysDialogActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
