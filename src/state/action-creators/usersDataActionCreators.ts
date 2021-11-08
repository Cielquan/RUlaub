import { batch } from "react-redux";
import { Dispatch } from "redux";

import { updateCalendarRowUserMapAction } from ".";
import { store } from "..";
import { UsersDataActionType } from "../action-types";
import { CalendarRowUserMapAction, UsersDataAction } from "../actions";
import { logError } from "../../backendAPI";
import {
  addUsers,
  addVacations,
  loadUsers,
  removeUsers,
  removeVacations,
  updateUsers,
  updateVacations,
} from "../../backendAPI/usersData";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import {
  NewUserData,
  NewVacationData,
  UserDataPayload,
  VacationDataPayload,
} from "../utils/types";

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
      const data = await addUsers(payload);

      batch(() => {
        dispatch(addUsersDataAction(data));
        dispatch(updateCalendarRowUserMapAction(getState().usersData));
      });
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const addVacationsDataAction = (payload: UsersData): UsersDataAction => ({
  type: UsersDataActionType.ADD_VAC,
  payload,
});

export const addVacationsData =
  (payload: NewVacationData[]) =>
  async (dispatch: Dispatch<UsersDataAction>): Promise<void> => {
    try {
      const data = await addVacations(payload);

      dispatch(addVacationsDataAction(data));
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
      const data = await loadUsers();

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
      const data = await removeUsers(payload);

      batch(() => {
        dispatch(removeUsersDataAction(data));
        dispatch(updateCalendarRowUserMapAction(getState().usersData));
      });
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const removeVacationsDataAction = (payload: UsersData): UsersDataAction => ({
  type: UsersDataActionType.REMOVE_VAC,
  payload,
});

export const removeVacationsData =
  (payload: string[]) =>
  async (dispatch: Dispatch<UsersDataAction>): Promise<void> => {
    try {
      const data = await removeVacations(payload);

      dispatch(removeVacationsDataAction(data));
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
      const data = await updateUsers(payload);

      batch(() => {
        dispatch(updateUsersDataAction(data));
        dispatch(updateCalendarRowUserMapAction(getState().usersData));
      });
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const updateVacationsDataAction = (payload: UsersData): UsersDataAction => ({
  type: UsersDataActionType.UPDATE_VAC,
  payload,
});

export const updateVacationsData =
  (payload: VacationDataPayload[]) =>
  async (dispatch: Dispatch<UsersDataAction>): Promise<void> => {
    try {
      const data = await updateVacations(payload);

      dispatch(updateVacationsDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };
