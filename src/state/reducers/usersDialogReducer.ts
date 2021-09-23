import { UsersDialogActionType } from "../action-types";
import { UsersDialogAction } from "../actions";
import { usersDialogInitState as initState } from "./initialStates";

const reducer = (state: boolean = initState, action: UsersDialogAction): boolean => {
  switch (action.type) {
    case UsersDialogActionType.OPEN:
      return true;
    case UsersDialogActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
