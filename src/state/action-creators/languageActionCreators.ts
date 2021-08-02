import { Dispatch } from "redux";

import { LanguageType } from "../action-types";
import { LanguageAction } from "../actions";

import store from "../store";

export const useDE =
  () =>
  (dispatch: Dispatch<LanguageAction>): void => {
    dispatch({
      type: LanguageType.DE,
    });
  };

export const useEN =
  () =>
  (dispatch: Dispatch<LanguageAction>): void => {
    dispatch({
      type: LanguageType.EN,
    });
  };

export const loadLang =
  () =>
  (
    dispatch: Dispatch<LanguageAction>,
    getState: () => ReturnType<typeof store.getState>
  ): void => {
    const states = getState();
    if (states.localConfig.settings.language !== states.language.locale) {
      if (states.localConfig.settings.language === "de-DE") {
        dispatch({
          type: LanguageType.DE,
        });
      } else {
        dispatch({
          type: LanguageType.EN,
        });
      }
    }
  };
