import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";
import { Dispatch } from "redux";

import { ConfigActionType } from "../action-types";
import { ConfigAction } from "../actions";
// eslint-disable-next-line max-len
import { ConfigFileSchema as ConfigFile } from "../../backendAPI/types/configFile.schema";

export const updateConfigAction = (payload: ConfigFile): ConfigAction => ({
  type: ConfigActionType.UPDATE,
  payload,
});

export const loadConfig =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("get_config_state");

    dispatch(updateConfigAction(conf));
  };

export const activateDE =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_langauge", { lang: "de-DE" });

    dispatch(updateConfigAction(conf));
  };

export const activateEN =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_langauge", { lang: "en-US" });

    dispatch(updateConfigAction(conf));
  };

export const activateDarkTheme =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_langauge", { theme: "dark" });

    dispatch(updateConfigAction(conf));
  };

export const activateLightTheme =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_langauge", { theme: "light" });

    dispatch(updateConfigAction(conf));
  };

const FILTERS = [{ name: "Database", extensions: ["db"] }];

export const createNewDB =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const path = await save({ filters: FILTERS });
    if (path === null) return;

    // TODO:#i# err handling
    const conf = await invoke<ConfigFile>("create_db", { path });

    dispatch(updateConfigAction(conf));
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

    const conf = await invoke<ConfigFile>("set_db_uri", { path });

    dispatch(updateConfigAction(conf));
  };
