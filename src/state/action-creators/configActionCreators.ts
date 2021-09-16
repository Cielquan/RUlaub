import { Dispatch } from "redux";

import { ConfigType } from "../action-types";
import { ConfigAction } from "../actions";
import { ConfigPayload } from "../utils/config";
import Languages from "../utils/i18n";

export const updateConfigAction = (payload: ConfigPayload): ConfigAction => ({
  type: ConfigType.UPDATE,
  payload,
});

export const updateConfig =
  (payload: ConfigPayload) =>
  (dispatch: Dispatch<ConfigAction>): void => {
    dispatch(updateConfigAction(payload));
  };

export const activateDE =
  () =>
  (dispatch: Dispatch<ConfigAction>): void => {
    dispatch(updateConfigAction({ settings: { language: Languages.german } }));
  };

export const activateEN =
  () =>
  (dispatch: Dispatch<ConfigAction>): void => {
    dispatch(updateConfigAction({ settings: { language: Languages.english } }));
  };

export const activateDarkTheme =
  () =>
  (dispatch: Dispatch<ConfigAction>): void => {
    dispatch(updateConfigAction({ settings: { theme: "dark" } }));
  };

export const activateLightTheme =
  () =>
  (dispatch: Dispatch<ConfigAction>): void => {
    dispatch(updateConfigAction({ settings: { theme: "light" } }));
  };
