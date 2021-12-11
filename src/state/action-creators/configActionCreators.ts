import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";
import { Dispatch } from "redux";

import { ConfigActionType } from "../action-types";
import { ConfigAction } from "../actions";
import {
  ConfigFileSchema as ConfigFile,
  LogLevel,
  SupportedLanguages,
  SupportedThemes,
} from "../../backendAPI/types/configFile.schema";

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

export const setLanguage =
  (lang: SupportedLanguages) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_langauge", { lang });

    dispatch(updateConfigAction(conf));
  };

export const setLogLevel =
  (level: LogLevel) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_log_level", { level });

    dispatch(updateConfigAction(conf));
  };

export const setTheme =
  (theme: SupportedThemes) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_theme", { theme });

    dispatch(updateConfigAction(conf));
  };

export const setTodayAutoscrollLeftOffset =
  (offset: number) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_today_autoscroll_left_offset", {
      offset,
    });

    dispatch(updateConfigAction(conf));
  };

export const setUserName =
  (name: string) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_user_name", { name });

    dispatch(updateConfigAction(conf));
  };

export const setYearChangeScrollBegin =
  (doScroll: boolean) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_year_change_scroll_begin", { doScroll });

    dispatch(updateConfigAction(conf));
  };

export const setYearToShow =
  (year: number) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const conf = await invoke<ConfigFile>("set_year_to_show", { year });

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
