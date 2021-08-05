import { Dispatch } from "redux";

import { DBDataType } from "../action-types";
import { DBDataAction } from "../actions";
import { DBDataPayload } from "../utils/dbData";

// eslint-disable-next-line import/prefer-default-export
export const updateDBData =
  (payload: DBDataPayload) =>
  (dispatch: Dispatch<DBDataAction>): void => {
    dispatch({
      type: DBDataType.UPDATE,
      payload,
    });
  };
