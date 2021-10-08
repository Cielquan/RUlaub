import Ajv from "ajv";
import { batch } from "react-redux";
import { Dispatch } from "redux";

import { UsersDataActionType } from "../action-types";
import {
  CalendarRowUserMapAction,
  UsersDataAddAction,
  UsersDataLoadAction,
  UsersDataRemoveAction,
  UsersDataUpdateAction,
} from "../actions";
import UsersDataSchema from "../../schemas/usersData.schema.json";
import { UserData } from "../../types/usersData.schema";
import { UsersData, UserDataPayload } from "../utils/usersData";

import usersDataJSON from "../../dev_temp/test.usersData.json";
import { updateCalendarRowUserMapAction } from ".";
import { store } from "..";

export const addUsersDataAction = (payload: UserData[]): UsersDataAddAction => ({
  type: UsersDataActionType.ADD,
  payload,
});

export const addUsersData =
  (payload: UserData[]) =>
  (dispatch: Dispatch<UsersDataAddAction | CalendarRowUserMapAction>): void => {
    batch(() => {
      dispatch(addUsersDataAction(payload));
      dispatch(updateCalendarRowUserMapAction(store.getState().usersData));
    });
  };

export const loadUsersDataAction = (payload: UsersData): UsersDataLoadAction => ({
  type: UsersDataActionType.LOAD,
  payload,
});

export const loadUsersData =
  () =>
  (dispatch: Dispatch<UsersDataLoadAction | CalendarRowUserMapAction>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conf: any = usersDataJSON;

    const ajv = new Ajv();
    const validate = ajv.compile<UsersData>(UsersDataSchema);
    if (validate(conf)) {
      batch(() => {
        dispatch(loadUsersDataAction(conf));
        dispatch(updateCalendarRowUserMapAction(store.getState().usersData));
      });
    }
  };

export const removeUsersDataAction = (payload: string[]): UsersDataRemoveAction => ({
  type: UsersDataActionType.REMOVE,
  payload,
});

export const removeUsersData =
  (payload: string[]) =>
  (dispatch: Dispatch<UsersDataRemoveAction | CalendarRowUserMapAction>): void => {
    batch(() => {
      dispatch(removeUsersDataAction(payload));
      dispatch(updateCalendarRowUserMapAction(store.getState().usersData));
    });
  };

export const updateUsersDataAction = (
  payload: UserDataPayload[]
): UsersDataUpdateAction => ({
  type: UsersDataActionType.UPDATE,
  payload,
});

export const updateUsersData =
  (payload: UserDataPayload[]) =>
  (dispatch: Dispatch<UsersDataUpdateAction | CalendarRowUserMapAction>): void => {
    batch(() => {
      dispatch(updateUsersDataAction(payload));
      dispatch(updateCalendarRowUserMapAction(store.getState().usersData));
    });
  };
