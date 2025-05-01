import { AddVacationDialogActionType } from "../action-types";
import { AddVacationDialogAction } from "../actions";
import { vacationsDialogInitState as initState } from "./initialStates";

const reducer = (state: boolean = initState, action: AddVacationDialogAction): boolean => {
  switch (action.type) {
    case AddVacationDialogActionType.OPEN:
      return true;
    case AddVacationDialogActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
