import { SchoolHolidaysDialogActionType } from "../action-types";
import { SchoolHolidaysDialogAction } from "../actions";
import { schoolHolidaysDialogInitState as initState } from "./initialStates";

const reducer = (
  state: boolean = initState,
  action: SchoolHolidaysDialogAction
): boolean => {
  switch (action.type) {
    case SchoolHolidaysDialogActionType.OPEN:
      return true;
    case SchoolHolidaysDialogActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
