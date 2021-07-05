import { DBDataType } from "../action-types";
import { DBDataAction } from "../actions";
import { DBData, updateDBData } from "../utils/dbData";
import dbData from "../../dev_temp/test.db.json";

const initialState: DBData = dbData;

const reducer = (state: DBData = initialState, action: DBDataAction): DBData => {
  switch (action.type) {
    case DBDataType.UPDATE:
      return updateDBData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
