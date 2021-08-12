import { Dispatch } from "redux";

import { InfoPageType } from "../action-types";
import { InfoPageAction } from "../actions";

export const openInfoPageAction = (): InfoPageAction => ({
  type: InfoPageType.OPEN,
});

export const openInfoPage =
  () =>
  (dispatch: Dispatch<InfoPageAction>): void => {
    dispatch(openInfoPageAction());
  };

export const closeInfoPageAction = (): InfoPageAction => ({
  type: InfoPageType.CLOSE,
});

export const closeInfoPage =
  () =>
  (dispatch: Dispatch<InfoPageAction>): void => {
    dispatch(closeInfoPageAction());
  };
