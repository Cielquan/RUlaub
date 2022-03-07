import { invoke } from "@tauri-apps/api";
import { Dispatch } from "redux";

import { DBInitLoadActionType } from "../action-types";
import { DBInitLoadAction } from "../actions";

export const setDBInitLoadERRAction = (): DBInitLoadAction => ({
  type: DBInitLoadActionType.SET_OK,
});

export const setDBInitLoadERR =
  () =>
  (dispatch: Dispatch<DBInitLoadAction>): void => {
    dispatch(setDBInitLoadERRAction());
  };

export const setDBInitLoadOKAction = (): DBInitLoadAction => ({
  type: DBInitLoadActionType.SET_OK,
});

export const setDBInitLoadOK =
  () =>
  (dispatch: Dispatch<DBInitLoadAction>): void => {
    dispatch(setDBInitLoadOKAction());
  };

export const getDBInitLoadState =
  () =>
  async (dispatch: Dispatch<DBInitLoadAction>): Promise<void> => {
    try {
      const x = await invoke("get_db_init_state");
      invoke("print", { string: x });
    } catch (err) {
      dispatch(setDBInitLoadERRAction());
      return Promise.reject(err);
    }
    dispatch(setDBInitLoadOKAction());
    return Promise.resolve();
  };
