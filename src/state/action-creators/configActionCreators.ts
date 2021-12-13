import { dirname } from "path";
import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";
import { Dispatch } from "redux";

import { ConfigActionType } from "../action-types";
import { ConfigAction } from "../actions";
import { validateConfig } from "../../backendAPI/validation";
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
    const data = await invoke("get_config_state");

    let conf;
    try {
      conf = await validateConfig(data);
      dispatch(updateConfigAction(conf));
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-loadConfig",
      });
    }
  };

export const setLanguage =
  (lang: SupportedLanguages) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const data = await invoke<ConfigFile>("set_langauge", { lang });

    let conf;
    try {
      conf = await validateConfig(data);
      dispatch(updateConfigAction(conf));
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setLanguage",
      });
    }
  };

export const setLogLevel =
  (level: LogLevel) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const data = await invoke<ConfigFile>("set_log_level", { level });

    let conf;
    try {
      conf = await validateConfig(data);
      dispatch(updateConfigAction(conf));
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setLogLevel",
      });
    }
  };

export const setTheme =
  (theme: SupportedThemes) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const data = await invoke<ConfigFile>("set_theme", { theme });

    let conf;
    try {
      conf = await validateConfig(data);
      dispatch(updateConfigAction(conf));
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setTheme",
      });
    }
  };

export const setTodayAutoscrollLeftOffset =
  (offset: number) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const data = await invoke<ConfigFile>("set_today_autoscroll_left_offset", {
      offset,
    });

    let conf;
    try {
      conf = await validateConfig(data);
      dispatch(updateConfigAction(conf));
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location:
          "state/action-creators/configActionCreators.ts-setTodayAutoscrollLeftOffset",
      });
    }
  };

export const setUserName =
  (name: string) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const data = await invoke<ConfigFile>("set_user_name", { name });

    let conf;
    try {
      conf = await validateConfig(data);
      dispatch(updateConfigAction(conf));
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setUserName",
      });
    }
  };

export const setYearChangeScrollBegin =
  (doScroll: boolean) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const data = await invoke<ConfigFile>("set_year_change_scroll_begin", { doScroll });

    let conf;
    try {
      conf = await validateConfig(data);
      dispatch(updateConfigAction(conf));
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location:
          "state/action-creators/configActionCreators.ts-setYearChangeScrollBegin",
      });
    }
  };

export const setYearToShow =
  (year: number) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const data = await invoke<ConfigFile>("set_year_to_show", { year });

    let conf;
    try {
      conf = await validateConfig(data);
      dispatch(updateConfigAction(conf));
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setYearToShow",
      });
    }
  };

const FILTERS = [{ name: "Database", extensions: ["db"] }];

export const createNewDB =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const path = await save({ filters: FILTERS });
    if (path === null) return;

    // TODO:#i# err handling
    const data = await invoke<ConfigFile>("create_db", { path });

    let conf;
    try {
      conf = await validateConfig(data);
      dispatch(updateConfigAction(conf));
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-createNewDB",
      });
    }
  };

export const selectDB =
  () =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const dbUri = (await invoke<ConfigFile>("get_config_state")).settings.databaseUri;

    const path = (await open({
      defaultPath: dbUri ? dirname(dbUri) : undefined,
      filters: FILTERS,
      multiple: false,
      directory: false,
    })) as string;
    if (path === null) return;

    const data = await invoke<ConfigFile>("set_db_uri", { path });

    let conf;
    try {
      conf = await validateConfig(data);
      dispatch(updateConfigAction(conf));
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-selectDB",
      });
    }
  };
