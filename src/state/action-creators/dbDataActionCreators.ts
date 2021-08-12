import { Dispatch } from "redux";

import { DBDataType } from "../action-types";
import { DBDataAction } from "../actions";
import { DBDataPayload } from "../utils/dbData";

export const updateDBDataAction = (payload: DBDataPayload): DBDataAction => ({
  type: DBDataType.UPDATE,
  payload,
});

export const updateDBData =
  (payload: DBDataPayload) =>
  (dispatch: Dispatch<DBDataAction>): void => {
    dispatch(updateDBDataAction(payload));
  };
