import { Dispatch } from "redux";

import { LanguageType } from "../action-types";
import { LanguageAction } from "../actions";
import store from "../store";

export const activateDEAction = (): LanguageAction => ({
  type: LanguageType.DE,
});

export const activateDE =
  () =>
  (dispatch: Dispatch<LanguageAction>): void => {
    dispatch(activateDEAction());
  };

export const activateENAction = (): LanguageAction => ({
  type: LanguageType.EN,
});

export const activateEN =
  () =>
  (dispatch: Dispatch<LanguageAction>): void => {
    dispatch(activateENAction());
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
        dispatch(activateDEAction());
      } else {
        dispatch(activateENAction());
      }
    }
  };
