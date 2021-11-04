import { batch } from "react-redux";
import { Dispatch } from "redux";

import { updateCalendarRowUserMapAction } from ".";
import { store } from "..";
import { UsersDataActionType } from "../action-types";
import { CalendarRowUserMapAction, UsersDataAction } from "../actions";
import { logError } from "../../backendAPI";
import { add, load, remove, update } from "../../backendAPI/usersData";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { NewUserData, UserDataPayload } from "../utils/types";

export const addUsersDataAction = (payload: UsersData): UsersDataAction => ({
  type: UsersDataActionType.ADD,
  payload,
});

export const addUsersData =
  (payload: NewUserData[]) =>
  async (
    dispatch: Dispatch<UsersDataAction | CalendarRowUserMapAction>,
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

export const loadUsersDataAction = (payload: UsersData): UsersDataAction => ({
  type: UsersDataActionType.LOAD,
  payload,
});

export const loadUsersData =
  () =>
  async (
    dispatch: Dispatch<UsersDataAction | CalendarRowUserMapAction>,
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

export const removeUsersDataAction = (payload: UsersData): UsersDataAction => ({
  type: UsersDataActionType.REMOVE,
  payload,
});

export const removeUsersData =
  (payload: string[]) =>
  async (
    dispatch: Dispatch<UsersDataAction | CalendarRowUserMapAction>,
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

export const updateUsersDataAction = (payload: UsersData): UsersDataAction => ({
  type: UsersDataActionType.UPDATE,
  payload,
});

export const updateUsersData =
  (payload: UserDataPayload[]) =>
  async (
    dispatch: Dispatch<UsersDataAction | CalendarRowUserMapAction>,
    getState: typeof store.getState
  ): Promise<void> => {
    try {
      const data = await update(payload);

      batch(() => {
        dispatch(updateUsersDataAction(data));
        dispatch(updateCalendarRowUserMapAction(getState().usersData));
      });
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };
