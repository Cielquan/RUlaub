import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";
import { ProviderContext } from "notistack";
import { dirname } from "path";
import { Dispatch } from "redux";

import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import {
  ConfigFileSchema as ConfigFile,
  LogLevel,
  SupportedLanguages,
  SupportedThemes,
} from "../../backendAPI/types/configFile.schema";
import { validateConfig } from "../../backendAPI/validation";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";
import { ConfigActionType } from "../action-types";
import { ConfigAction } from "../actions";

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
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-loadConfig",
      });
      return;
    }
    dispatch(updateConfigAction(conf));
  };

export const setLanguage =
  (lang: SupportedLanguages, snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    let data;
    try {
      data = await invoke<ConfigFile>("set_langauge", { lang });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let conf;
    try {
      conf = await validateConfig(data);
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setLanguage",
      });
      return;
    }
    dispatch(updateConfigAction(conf));
  };

export const setLogLevel =
  (level: LogLevel, snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    let data;
    try {
      data = await invoke<ConfigFile>("set_log_level", { level });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let conf;
    try {
      conf = await validateConfig(data);
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setLogLevel",
      });
      return;
    }
    dispatch(updateConfigAction(conf));
  };

export const setTheme =
  (theme: SupportedThemes, snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    let data;
    try {
      data = await invoke<ConfigFile>("set_theme", { theme });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let conf;
    try {
      conf = await validateConfig(data);
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setTheme",
      });
      return;
    }
    dispatch(updateConfigAction(conf));
  };

export const setTodayAutoscrollLeftOffset =
  (offset: number, snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    let data;
    try {
      data = await invoke<ConfigFile>("set_today_autoscroll_left_offset", {
        offset,
      });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let conf;
    try {
      conf = await validateConfig(data);
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setTodayAutoscrollLeftOffset",
      });
      return;
    }
    dispatch(updateConfigAction(conf));
  };

export const setUserName =
  (name: string, snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    let data;
    try {
      data = await invoke<ConfigFile>("set_user_name", { name });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let conf;
    try {
      conf = await validateConfig(data);
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setUserName",
      });
      return;
    }
    dispatch(updateConfigAction(conf));
  };

export const setYearChangeScrollBegin =
  (doScroll: boolean, snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    let data;
    try {
      data = await invoke<ConfigFile>("set_year_change_scroll_begin", { doScroll });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let conf;
    try {
      conf = await validateConfig(data);
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setYearChangeScrollBegin",
      });
      return;
    }
    dispatch(updateConfigAction(conf));
  };

export const setYearToShow =
  (year: number, snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    let data;
    try {
      data = await invoke<ConfigFile>("set_year_to_show", { year });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let conf;
    try {
      conf = await validateConfig(data);
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-setYearToShow",
      });
      return;
    }
    dispatch(updateConfigAction(conf));
  };

const FILTERS = [{ name: "Database", extensions: ["db"] }];

export const createNewDB =
  (snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const path = await save({ filters: FILTERS });
    if (path === null) return;

    let data;
    try {
      data = await invoke<ConfigFile>("create_db", { path });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let conf;
    try {
      conf = await validateConfig(data);
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-createNewDB",
      });
      return;
    }
    dispatch(updateConfigAction(conf));
  };

export const selectDB =
  (snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<ConfigAction>): Promise<void> => {
    const dbUri = (await invoke<ConfigFile>("get_config_state")).settings.databaseUri;

    const path = (await open({
      defaultPath: dbUri ? dirname(dbUri) : undefined,
      filters: FILTERS,
      multiple: false,
      directory: false,
    })) as string;
    if (path === null) return;

    let data;
    try {
      data = await invoke<ConfigFile>("set_db_uri", { path });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let conf;
    try {
      conf = await validateConfig(data);
    } catch (err) {
      invoke("log_error", {
        target: "config",
        message: `Config data validation failed: ${err}`,
        location: "state/action-creators/configActionCreators.ts-selectDB",
      });
      return;
    }
    dispatch(updateConfigAction(conf));
  };
