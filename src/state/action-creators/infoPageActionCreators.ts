import { Dispatch } from "redux";

import { InfoPageType } from "../action-types";
import { InfoPageAction } from "../actions";

export const openInfoPage =
  () =>
  (dispatch: Dispatch<InfoPageAction>): void => {
    dispatch({
      type: InfoPageType.OPEN,
    });
  };

export const closeInfoPage =
  () =>
  (dispatch: Dispatch<InfoPageAction>): void => {
    dispatch({
      type: InfoPageType.CLOSE,
    });
  };
