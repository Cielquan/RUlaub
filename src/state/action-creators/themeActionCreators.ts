import { Dispatch } from "redux";

import { ThemeType } from "../action-types";
import { ThemeAction } from "../actions";
import store from "../store";

export const activateDarkThemeAction = (): ThemeAction => ({
  type: ThemeType.DARK,
});

export const activateDarkTheme =
  () =>
  (dispatch: Dispatch<ThemeAction>): void => {
    dispatch(activateDarkThemeAction());
  };

export const activateLightThemeAction = (): ThemeAction => ({
  type: ThemeType.LIGHT,
});

export const activateLightTheme =
  () =>
  (dispatch: Dispatch<ThemeAction>): void => {
    dispatch(activateLightThemeAction());
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
        dispatch(activateDarkThemeAction());
      } else {
        dispatch(activateLightThemeAction());
      }
    }
  };
