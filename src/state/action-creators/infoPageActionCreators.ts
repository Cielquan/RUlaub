import { Dispatch } from "redux";

import { InfoPageActionType } from "../action-types";
import { InfoPageAction } from "../actions";

export const openInfoPageAction = (): InfoPageAction => ({
  type: InfoPageActionType.OPEN,
});

export const openInfoPage =
  () =>
  (dispatch: Dispatch<InfoPageAction>): void => {
    dispatch(openInfoPageAction());
  };

export const closeInfoPageAction = (): InfoPageAction => ({
  type: InfoPageActionType.CLOSE,
});

export const closeInfoPage =
  () =>
  (dispatch: Dispatch<InfoPageAction>): void => {
    dispatch(closeInfoPageAction());
  };
