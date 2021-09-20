import Ajv from "ajv";
import { Dispatch } from "redux";

import { ConfigActionType } from "../action-types";
import { ConfigAction } from "../actions";
import { ConfigFileSchema as ConfigFileType } from "../../types/configFile.schema";
import ConfigFileSchema from "../../schemas/configFile.schema.json";
import { ConfigPayload } from "../utils/config";
import Languages, { localeToLanguage } from "../utils/i18n";

import localConfigJSON from "../../dev_temp/test.local_config.json";

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
  (dispatch: Dispatch<ConfigAction>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conf: any = localConfigJSON;

    const ajv = new Ajv();
    const validate = ajv.compile<ConfigFileType>(ConfigFileSchema);
    if (validate(conf)) {
      if (conf.settings?.language !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (conf as any).settings.language = localeToLanguage(conf.settings.language);
      }
      dispatch(updateConfigAction(conf as ConfigPayload));
    }
  };
