import { Dispatch } from "redux";
import { HelpPageType } from "../action-types";
import { HelpPageAction } from "../actions";

export const openHelpPage =
  () =>
  (dispatch: Dispatch<HelpPageAction>): void => {
    dispatch({
      type: HelpPageType.OPEN,
    });
  };

export const closeHelpPage =
  () =>
  (dispatch: Dispatch<HelpPageAction>): void => {
    dispatch({
      type: HelpPageType.CLOSE,
    });
  };
