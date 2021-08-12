import { Dispatch } from "redux";

import { LanguageType } from "../action-types";
import { LanguageAction } from "../actions";

import store from "../store";

export const useDEAction = (): LanguageAction => ({
  type: LanguageType.DE,
});

export const useDE =
  () =>
  (dispatch: Dispatch<LanguageAction>): void => {
    dispatch(useDEAction());
  };

export const useENAction = (): LanguageAction => ({
  type: LanguageType.EN,
});

export const useEN =
  () =>
  (dispatch: Dispatch<LanguageAction>): void => {
    dispatch(useENAction());
  };

export const loadLangState =
  () =>
  (
    dispatch: Dispatch<LanguageAction>,
    getState: () => ReturnType<typeof store.getState>
  ): void => {
    const states = getState();
    if (states.localConfig.settings.language !== states.language.locale) {
      if (states.localConfig.settings.language === "de-DE") {
        dispatch(useDEAction());
      } else {
        dispatch(useENAction());
      }
    }
  };
