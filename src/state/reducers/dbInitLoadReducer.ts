import { DBInitLoadActionType } from "../action-types";
import { DBInitLoadAction } from "../actions";
import { DBInitLoadState, dbInitLoadInitState as initState } from "./initialStates";

const reducer = (state: DBInitLoadState = initState, action: DBInitLoadAction): DBInitLoadState => {
  switch (action.type) {
    case DBInitLoadActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
