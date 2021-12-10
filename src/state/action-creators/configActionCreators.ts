import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";
import { Dispatch } from "redux";

import { ConfigActionType } from "../action-types";
import { ConfigAction } from "../actions";
import { load } from "../../backendAPI/config";
import { ConfigPayload } from "../utils/config";
import Languages from "../utils/i18n";

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

const FILTERS = [{ name: "Database", extensions: ["db"] }];

export const createNewDB =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const path = await save({ filters: FILTERS });
    if (path === null) return;
    invoke("create_db", { path }).then(() =>
      dispatch(updateConfigAction({ settings: { databaseURI: path } }))
    );
  };

export const selectDB =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const path = (await open({
      filters: FILTERS,
      multiple: false,
      directory: false,
    })) as string;
    if (path === null) return;
    dispatch(updateConfigAction({ settings: { databaseURI: path } }));
  };

export const loadConfig =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    try {
      const conf = await load();

      dispatch(updateConfigAction(conf as ConfigPayload));
    } catch (error) {
      // TODO:#i# add snackbar
      console.error(error);
    }
  };
