import { batch } from "react-redux";
import { Dispatch } from "redux";

import { updateCalendarRowUserMapAction } from ".";
import { store } from "..";
import { UsersDataActionType } from "../action-types";
import {
  CalendarRowUserMapAction,
  UsersDataAddAction,
  UsersDataLoadAction,
  UsersDataRemoveAction,
  UsersDataUpdateAction,
} from "../actions";
import { load } from "../../backendAPI/usersData";
import { UserData } from "../../backendAPI/types/usersData.schema";
import { UsersData, UserDataPayload } from "../utils/usersData";

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
  async (
    dispatch: Dispatch<UsersDataLoadAction | CalendarRowUserMapAction>,
    getState: typeof store.getState
  ): Promise<void> => {
    try {
      const data = await load();

      batch(() => {
        dispatch(loadUsersDataAction(data));
        dispatch(updateCalendarRowUserMapAction(getState().usersData));
      });
    } catch (error) {
      // TODO:#i# add snackbar
      console.error(error);
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
