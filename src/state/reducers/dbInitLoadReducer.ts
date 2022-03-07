import { DBInitLoadActionType } from "../action-types";
import { DBInitLoadAction } from "../actions";
import { dbInitLoadInitState as initState } from "./initialStates";

export enum DBInitLoadState {
  NOT_LOADED,
  OK,
  ERR,
}

const reducer = (state: DBInitLoadState = initState, action: DBInitLoadAction): DBInitLoadState => {
  switch (action.type) {
    case DBInitLoadActionType.SET_OK:
      return DBInitLoadState.OK;
    case DBInitLoadActionType.SET_ERR:
      return DBInitLoadState.ERR;
    default:
      return state;
  }
};

export default reducer;
