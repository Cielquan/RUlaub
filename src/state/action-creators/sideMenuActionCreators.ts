import { Dispatch } from "redux";

import { SideMenuType } from "../action-types";
import { SideMenuAction } from "../actions";

export const openSideMenuAction = (): SideMenuAction => ({
  type: SideMenuType.OPEN,
});

export const openSideMenu =
  () =>
  (dispatch: Dispatch<SideMenuAction>): void => {
    dispatch(openSideMenuAction());
  };

export const closeSideMenuAction = (): SideMenuAction => ({
  type: SideMenuType.CLOSE,
});

export const closeSideMenu =
  () =>
  (dispatch: Dispatch<SideMenuAction>): void => {
    dispatch(closeSideMenuAction());
  };
