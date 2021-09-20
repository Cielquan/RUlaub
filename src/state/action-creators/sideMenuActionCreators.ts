import { Dispatch } from "redux";

import { SideMenuActionType } from "../action-types";
import { SideMenuAction } from "../actions";

export const openSideMenuAction = (): SideMenuAction => ({
  type: SideMenuActionType.OPEN,
});

export const openSideMenu =
  () =>
  (dispatch: Dispatch<SideMenuAction>): void => {
    dispatch(openSideMenuAction());
  };

export const closeSideMenuAction = (): SideMenuAction => ({
  type: SideMenuActionType.CLOSE,
});

export const closeSideMenu =
  () =>
  (dispatch: Dispatch<SideMenuAction>): void => {
    dispatch(closeSideMenuAction());
  };
