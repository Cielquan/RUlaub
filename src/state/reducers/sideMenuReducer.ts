import { SideMenuType } from "../action-types";
import { SideMenuAction } from "../actions";
import { sideMenuInitState as initState } from "./initialStates";

const reducer = (state: boolean = initState, action: SideMenuAction): boolean => {
  switch (action.type) {
    case SideMenuType.OPEN:
      return true;
    case SideMenuType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
