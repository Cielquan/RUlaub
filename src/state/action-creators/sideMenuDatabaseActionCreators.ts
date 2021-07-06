import { Dispatch } from "redux";

import { SideMenuDatabaseType } from "../action-types";
import { SideMenuDatabaseAction } from "../actions";

export const openSideMenuDatabase =
  () =>
  (dispatch: Dispatch<SideMenuDatabaseAction>): void => {
    dispatch({
      type: SideMenuDatabaseType.OPEN,
    });
  };

export const closeSideMenuDatabase =
  () =>
  (dispatch: Dispatch<SideMenuDatabaseAction>): void => {
    dispatch({
      type: SideMenuDatabaseType.CLOSE,
    });
  };
