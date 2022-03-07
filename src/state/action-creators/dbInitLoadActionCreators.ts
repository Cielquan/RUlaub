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

export const getDBInitLoadState =
  () =>
  async (dispatch: Dispatch<DBInitLoadAction>): Promise<void> => {
    try {
      await invoke("get_db_init_state");
    } catch (err) {
      invoke("log_error", {
        target: "dbInitLoad",
        message: "Database init load failed",
        location: "state/action-creators/dbInitLoadActionCreators.ts-getDBInitLoadState",
        errObjectString: JSON.stringify(err),
      });

      dispatch(setDBInitLoadStateAction(DBInitLoadState.ERR));
      return Promise.reject(err);
    }

    invoke("log_debug", {
      target: "dbInitLoad",
      message: "Database init load succeeded",
      location: "state/action-creators/dbInitLoadActionCreators.ts-getDBInitLoadState",
    });

    dispatch(setDBInitLoadStateAction(DBInitLoadState.OK));
    return Promise.resolve();
  };
