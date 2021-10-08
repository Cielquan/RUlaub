import { Dispatch } from "redux";

import { ConfigActionType } from "../action-types";
import { ConfigAction } from "../actions";
import { load } from "../../backendAPI/config";
import { ConfigPayload } from "../utils/config";
import Languages, { localeToLanguage } from "../utils/i18n";

export const updateConfigAction = (payload: ConfigPayload): ConfigAction => ({
  type: ConfigActionType.UPDATE,
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

export const loadConfig =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    try {
      const conf = await load();

      if (conf.settings?.language !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (conf as any).settings.language = localeToLanguage(conf.settings.language);
      }
      dispatch(updateConfigAction(conf as ConfigPayload));
    } catch (error) {
      // TODO:#i# add snackbar
      console.error(error);
    }
  };
