import { VacationsDialogActionType } from "../action-types";
import { VacationsDialogAction } from "../actions";
import { vacationsDialogInitState as initState } from "./initialStates";

const reducer = (
  state: boolean = initState,
  action: VacationsDialogAction
): boolean => {
  switch (action.type) {
    case VacationsDialogActionType.OPEN:
      return true;
    case VacationsDialogActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
