import { invoke } from "@tauri-apps/api";
import { batch } from "react-redux";
import { Dispatch } from "redux";

import { updateCalendarRowUserMapAction } from ".";
import { UsersDataActionType } from "../action-types";
import { CalendarRowUserMapAction, UsersDataAction } from "../actions";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { NewUserData, UserDataPayload } from "../../backendAPI/types/helperTypes";
import { validateUsersData } from "../../backendAPI/validation";
import { store } from "..";

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
    let data;
    try {
      data = await invoke("load_users");
    } catch (err) {
      invoke("log_error", {
        target: "users",
        message: `Loading of Users data from database failed: ${err}`,
        location: "state/action-creators/usersDataActionCreators.ts-loadUsersData",
      });
    }

    try {
      const valData = await validateUsersData(data);
      batch(() => {
        dispatch(loadUsersDataAction(valData));
        dispatch(updateCalendarRowUserMapAction(getState().usersData));
      });
    } catch (err) {
      invoke("log_error", {
        target: "users",
        message: `Users data validation failed: ${err}`,
        location: "state/action-creators/usersDataActionCreators.ts-loadUsersData",
      });
    }
  };

export const updateUsersDataAction = (payload: UsersData): UsersDataAction => ({
  type: UsersDataActionType.UPDATE,
  payload,
});

export const updateUsersData =
  (
    newEntries: NewUserData[] | null,
    updatedEntries: UserDataPayload[] | null,
    removedEntries: string[] | null
  ) =>
  async (
    dispatch: Dispatch<UsersDataAction | CalendarRowUserMapAction>,
    getState: typeof store.getState
  ): Promise<void> => {
    let data;
    try {
      data = await invoke("update_users", {
        newEntries,
        updatedEntries,
        removedEntries,
      });
    } catch (err) {
      invoke("log_error", {
        target: "users",
        message: `Updating Users data in database failed: ${err}`,
        location: "state/action-creators/usersDataActionCreators.ts-updateUsersData",
      });
    }

    try {
      const valData = await validateUsersData(data);
      batch(() => {
        dispatch(updateUsersDataAction(valData));
        dispatch(updateCalendarRowUserMapAction(getState().usersData));
      });
    } catch (err) {
      invoke("log_error", {
        target: "users",
        message: `Users data validation failed: ${err}`,
        location: "state/action-creators/usersDataActionCreators.ts-updateUsersData",
      });
    }
  };
