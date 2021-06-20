import { SideMenuDatabaseType } from "../action-types";
import { SideMenuDatabaseAction } from "../actions";

const initialState = false;

const reducer = (
  state: boolean = initialState,
  action: SideMenuDatabaseAction
): boolean => {
  switch (action.type) {
    case SideMenuDatabaseType.OPEN:
      return true;
    case SideMenuDatabaseType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
