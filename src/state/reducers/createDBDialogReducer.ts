import { CreateDBDialogActionType } from "../action-types";
import { CreateDBDialogAction } from "../actions";
import { createDBDialogInitState as initState } from "./initialStates";

const reducer = (state: boolean = initState, action: CreateDBDialogAction): boolean => {
  switch (action.type) {
    case CreateDBDialogActionType.OPEN:
      return true;
    case CreateDBDialogActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
