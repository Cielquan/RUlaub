import { Dispatch } from "redux";
import { LanguageType } from "../action-types";
import { LanguageAction } from "../actions";
import { SupportedLocales } from "../../i18n";

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

type LanguageActionCaller = () => (dispatch: Dispatch<LanguageAction>) => void;

export const changeLanguage = (locale: SupportedLocales): LanguageActionCaller => {
  switch (locale) {
    case "de-DE":
      return useDE;
    case "en-US":
      return useEN;
    default:
      return useEN;
  }
};
