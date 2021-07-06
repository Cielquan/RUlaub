import { Dispatch } from "redux";

import { ThemeType } from "../action-types";
import { ThemeAction } from "../actions";

export const useDarkTheme =
  () =>
  (dispatch: Dispatch<ThemeAction>): void => {
    dispatch({
      type: ThemeType.DARK,
    });
  };

export const useLightTheme =
  () =>
  (dispatch: Dispatch<ThemeAction>): void => {
    dispatch({
      type: ThemeType.LIGHT,
    });
  };
