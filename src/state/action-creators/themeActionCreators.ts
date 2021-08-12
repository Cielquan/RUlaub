import { Dispatch } from "redux";

import { ThemeType } from "../action-types";
import { ThemeAction } from "../actions";

import store from "../store";

export const useDarkThemeAction = (): ThemeAction => ({
  type: ThemeType.DARK,
});

export const useDarkTheme =
  () =>
  (dispatch: Dispatch<ThemeAction>): void => {
    dispatch(useDarkThemeAction());
  };

export const useLightThemeAction = (): ThemeAction => ({
  type: ThemeType.LIGHT,
});

export const useLightTheme =
  () =>
  (dispatch: Dispatch<ThemeAction>): void => {
    dispatch(useLightThemeAction());
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
        dispatch(useDarkThemeAction());
      } else {
        dispatch(useLightThemeAction());
      }
    }
  };
