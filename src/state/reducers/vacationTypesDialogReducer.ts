import { VacationTypesDialogActionType } from "../action-types";
import { VacationTypesDialogAction } from "../actions";
import { vacationTypesDialogInitState as initState } from "./initialStates";

const reducer = (
  state: boolean = initState,
  action: VacationTypesDialogAction
): boolean => {
  switch (action.type) {
    case VacationTypesDialogActionType.OPEN:
      return true;
    case VacationTypesDialogActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
