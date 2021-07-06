import { Dispatch } from "redux";

import { SideMenuType } from "../action-types";
import { SideMenuAction } from "../actions";

export const openSideMenu =
  () =>
  (dispatch: Dispatch<SideMenuAction>): void => {
    dispatch({
      type: SideMenuType.OPEN,
    });
  };

export const closeSideMenu =
  () =>
  (dispatch: Dispatch<SideMenuAction>): void => {
    dispatch({
      type: SideMenuType.CLOSE,
    });
  };
