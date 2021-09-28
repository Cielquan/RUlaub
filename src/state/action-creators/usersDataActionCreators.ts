import Ajv from "ajv";
import { Dispatch } from "redux";

import { UsersDataActionType } from "../action-types";
import { UsersDataAction } from "../actions";
import { UsersDataSchema as UsersDataType } from "../../types/usersData.schema";
import UsersDataSchema from "../../schemas/usersData.schema.json";
import { UsersDataPayload } from "../utils/usersData";

import usersDataJSON from "../../dev_temp/test.usersData.json";

export const updateUsersDataAction = (payload: UsersDataPayload): UsersDataAction => ({
  type: UsersDataActionType.UPDATE,
  payload,
});

export const updateUsersData =
  (payload: UsersDataPayload) =>
  (dispatch: Dispatch<UsersDataAction>): void => {
    dispatch(updateUsersDataAction(payload));
  };

export const loadUsersData =
  () =>
  (dispatch: Dispatch<UsersDataAction>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conf: any = usersDataJSON;

    const ajv = new Ajv();
    const validate = ajv.compile<UsersDataType>(UsersDataSchema);
    if (validate(conf)) {
      dispatch(updateUsersDataAction(conf));
    }
  };
