import { VacationDialogActionType } from "../action-types";
import { VacationDialogAction } from "../actions";
import { vacationDialogInitState as initState } from "./initialStates";

const reducer = (state: boolean = initState, action: VacationDialogAction): boolean => {
  switch (action.type) {
    case VacationDialogActionType.OPEN:
      return true;
    case VacationDialogActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
