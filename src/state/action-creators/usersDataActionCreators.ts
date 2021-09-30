import Ajv from "ajv";
import { Dispatch } from "redux";

import { UsersDataActionType } from "../action-types";
import {
  UsersDataLoadAction,
  UsersDataRemoveAction,
  UsersDataUpdateAction,
} from "../actions";
import UsersDataSchema from "../../schemas/usersData.schema.json";
import { UsersData, UserDataPayload } from "../utils/usersData";

import usersDataJSON from "../../dev_temp/test.usersData.json";

export const updateUsersDataAction = (
  payload: UserDataPayload[]
): UsersDataUpdateAction => ({
  type: UsersDataActionType.UPDATE,
  payload,
});

export const updateUsersData =
  (payload: UserDataPayload[]) =>
  (dispatch: Dispatch<UsersDataUpdateAction>): void => {
    dispatch(updateUsersDataAction(payload));
  };

export const removeUsersDataAction = (payload: string[]): UsersDataRemoveAction => ({
  type: UsersDataActionType.REMOVE,
  payload,
});

export const removeUsersData =
  (payload: string[]) =>
  (dispatch: Dispatch<UsersDataRemoveAction>): void => {
    dispatch(removeUsersDataAction(payload));
  };

export const loadUsersDataAction = (payload: UsersData): UsersDataLoadAction => ({
  type: UsersDataActionType.LOAD,
  payload,
});

export const loadUsersData =
  () =>
  (dispatch: Dispatch<UsersDataLoadAction>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conf: any = usersDataJSON;

    const ajv = new Ajv();
    const validate = ajv.compile<UsersData>(UsersDataSchema);
    if (validate(conf)) {
      dispatch(loadUsersDataAction(conf));
    }
  };
