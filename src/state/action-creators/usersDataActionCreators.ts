import { invoke } from "@tauri-apps/api";
import { ProviderContext } from "notistack";
import { batch } from "react-redux";
import { Dispatch } from "redux";

import { updateCalendarRowUserMapAction } from ".";
import { store } from "..";
import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { NewUserData, UserDataMap } from "../../backendAPI/types/helperTypes";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { validateUsersData } from "../../backendAPI/validation";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";
import { UsersDataActionType } from "../action-types";
import { CalendarRowUserMapAction, UsersDataAction } from "../actions";

export const loadUsersDataAction = (payload: UsersData): UsersDataAction => ({
  type: UsersDataActionType.LOAD,
  payload,
});

export const loadUsersData =
  (snackbarHandles: ProviderContext) =>
  async (
    dispatch: Dispatch<UsersDataAction | CalendarRowUserMapAction>,
    getState: typeof store.getState
  ): Promise<void> => {
    let data;
    try {
      data = await invoke("load_users");
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let validatedData: UsersData;
    try {
      validatedData = await validateUsersData(data);
    } catch (err) {
      invoke("log_error", {
        target: "users",
        message: `Users data validation failed: ${err}`,
        location: "state/action-creators/usersDataActionCreators.ts-loadUsersData",
      });
      return;
    }

    batch(() => {
      dispatch(loadUsersDataAction(validatedData));
      dispatch(updateCalendarRowUserMapAction(getState().usersData));
    });
  };

export const updateUsersDataAction = (payload: UsersData): UsersDataAction => ({
  type: UsersDataActionType.UPDATE,
  payload,
});

interface UpdatePayload {
  newEntries?: NewUserData[];
  updatedEntries?: UserDataMap;
  removedEntries?: number[];
}

export const updateUsersData =
  (
    { newEntries, updatedEntries, removedEntries }: UpdatePayload,
    snackbarHandles: ProviderContext
  ) =>
  async (
    dispatch: Dispatch<UsersDataAction | CalendarRowUserMapAction>,
    getState: typeof store.getState
  ): Promise<void> => {
    let data;
    try {
      data = await invoke("update_users", {
        newEntries: newEntries ?? null,
        updatedEntries: updatedEntries ?? null,
        removedEntries: removedEntries ?? null,
      });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let valData: UsersData;
    try {
      valData = await validateUsersData(data);
    } catch (err) {
      invoke("log_error", {
        target: "users",
        message: `Users data validation failed: ${err}`,
        location: "state/action-creators/usersDataActionCreators.ts-updateUsersData",
      });
      return;
    }

    batch(() => {
      dispatch(updateUsersDataAction(valData));
      dispatch(updateCalendarRowUserMapAction(getState().usersData));
    });
  };
