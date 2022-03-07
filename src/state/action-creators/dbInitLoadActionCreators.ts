import { invoke } from "@tauri-apps/api";
import { Dispatch } from "redux";

import { DBInitLoadActionType } from "../action-types";
import { DBInitLoadAction } from "../actions";
import { DBInitLoadState } from "../reducers/initialStates";

export const setDBInitLoadStateAction = (payload: DBInitLoadState): DBInitLoadAction => ({
  type: DBInitLoadActionType.UPDATE,
  payload,
});

export const setDBInitLoadState =
  (payload: DBInitLoadState) =>
  (dispatch: Dispatch<DBInitLoadAction>): void => {
    dispatch(setDBInitLoadStateAction(payload));
  };

const DBInitLoadStateMap: { [name: string]: DBInitLoadState } = {
  Loading: DBInitLoadState.NOT_LOADED,
  OK: DBInitLoadState.OK,
  NoUriSet: DBInitLoadState.NO_URI_SET,
  NoFileFound: DBInitLoadState.NO_FILE_FOUND,
  DBError: DBInitLoadState.ERR,
};

export const getDBInitLoadState =
  () =>
  async (dispatch: Dispatch<DBInitLoadAction>): Promise<void> => {
    let state;
    try {
      state = await invoke("get_db_init_state");
    } catch (err) {
      invoke("log_error", {
        target: "dbInitLoad",
        message: "Database init load failed",
        location: "state/action-creators/dbInitLoadActionCreators.ts-getDBInitLoadState",
        errObjectString: JSON.stringify(err),
      });

      let payload: DBInitLoadState | undefined = DBInitLoadStateMap[err as string];
      if (payload === undefined) payload = DBInitLoadState.ERR;
      dispatch(setDBInitLoadStateAction(payload));
      return Promise.reject(err);
    }

    invoke("log_debug", {
      target: "dbInitLoad",
      message: "Database init load succeeded",
      location: "state/action-creators/dbInitLoadActionCreators.ts-getDBInitLoadState",
    });

    dispatch(setDBInitLoadStateAction(DBInitLoadStateMap[state as string]));
    return Promise.resolve();
  };
