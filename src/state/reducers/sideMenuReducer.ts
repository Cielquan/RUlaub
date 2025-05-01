import { SideMenuActionType } from "../action-types";
import { SideMenuAction } from "../actions";
import { sideMenuInitState as initState } from "./initialStates";

const reducer = (state: boolean = initState, action: SideMenuAction): boolean => {
  switch (action.type) {
    case SideMenuActionType.OPEN:
      return true;
    case SideMenuActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
