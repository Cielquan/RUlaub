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
import { logError } from "../../backendAPI";
import { add, load, remove } from "../../backendAPI/usersData";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { NewUserData, UserDataPayload } from "../utils/usersData";

export const addUsersDataAction = (payload: UsersData): UsersDataAddAction => ({
  type: UsersDataActionType.ADD,
  payload,
});

export const addUsersData =
  (payload: NewUserData[]) =>
  async (
    dispatch: Dispatch<UsersDataAddAction | CalendarRowUserMapAction>,
    getState: typeof store.getState
  ): Promise<void> => {
    try {
      const data = await add(payload);

      batch(() => {
        dispatch(addUsersDataAction(data));
        dispatch(updateCalendarRowUserMapAction(getState().usersData));
      });
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
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
      logError(error as Error);
    }
  };

export const removeUsersDataAction = (payload: UsersData): UsersDataRemoveAction => ({
  type: UsersDataActionType.REMOVE,
  payload,
});

export const removeUsersData =
  (payload: string[]) =>
  async (
    dispatch: Dispatch<UsersDataRemoveAction | CalendarRowUserMapAction>,
    getState: typeof store.getState
  ): Promise<void> => {
    try {
      const data = await remove(payload);

      batch(() => {
        dispatch(removeUsersDataAction(data));
        dispatch(updateCalendarRowUserMapAction(getState().usersData));
      });
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
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
