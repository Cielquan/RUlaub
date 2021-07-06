import { Dispatch } from "redux";

import { LanguageType } from "../action-types";
import { LanguageAction } from "../actions";

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
