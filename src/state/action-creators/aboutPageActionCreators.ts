import { Dispatch } from "redux";

import { AboutPageActionType } from "../action-types";
import { AboutPageAction } from "../actions";

export const openAboutPageAction = (): AboutPageAction => ({
  type: AboutPageActionType.OPEN,
});

export const openAboutPage =
  () =>
  (dispatch: Dispatch<AboutPageAction>): void => {
    dispatch(openAboutPageAction());
  };

export const closeAboutPageAction = (): AboutPageAction => ({
  type: AboutPageActionType.CLOSE,
});

export const closeAboutPage =
  () =>
  (dispatch: Dispatch<AboutPageAction>): void => {
    dispatch(closeAboutPageAction());
  };
