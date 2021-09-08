import { DBDataType } from "../action-types";
import { DBDataAction } from "../actions";
import { dbDataInitState as initState } from "./initialStates";
import { DBData, updateDBData } from "../utils/dbData";

const reducer = (state: DBData = initState, action: DBDataAction): DBData => {
  switch (action.type) {
    case DBDataType.UPDATE:
      return updateDBData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
