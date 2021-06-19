import { SideMenuType } from "../action-types";
import { SideMenuAction } from "../actions";

const initialState = false;

const reducer = (state: boolean = initialState, action: SideMenuAction): boolean => {
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
