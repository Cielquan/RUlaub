import { Dispatch } from "redux";

import { ThemeType } from "../action-types";
import { ThemeAction } from "../actions";

import store from "../store";

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

export const loadThemeState =
  () =>
  (
    dispatch: Dispatch<ThemeAction>,
    getState: () => ReturnType<typeof store.getState>
  ): void => {
    const states = getState();
    if (states.localConfig.settings.theme !== states.theme) {
      if (states.localConfig.settings.theme === "dark") {
        dispatch({
          type: ThemeType.DARK,
        });
      } else {
        dispatch({
          type: ThemeType.LIGHT,
        });
      }
    }
  };
