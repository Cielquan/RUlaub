import { invoke } from "@tauri-apps/api";
import { batch } from "react-redux";
import { Dispatch } from "redux";

import {
  loadUsersData,
  loadUsersDataAction,
  updateCalendarRowUserMapAction,
  updateUsersDataAction,
} from ".";
import { store } from "..";
import { VacationsDataActionType } from "../action-types";
import {
  CalendarRowUserMapAction,
  UsersDataAction,
  VacationsDataAction,
} from "../actions";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
// eslint-disable-next-line max-len
import { VacationsDataSchema as VacationsData } from "../../backendAPI/types/vacationsData.schema";
import {
  NewVacationData,
  VacationDataPayload,
} from "../../backendAPI/types/helperTypes";
import { validateUsersData, validateVacationsData } from "../../backendAPI/validation";

export const loadVacationsDataAction = (
  payload: VacationsData
): VacationsDataAction => ({
  type: VacationsDataActionType.LOAD,
  payload,
});

export const loadVacationsData =
  () =>
  async (
    dispatch: Dispatch<
      VacationsDataAction | UsersDataAction | CalendarRowUserMapAction
    >,
    getState: typeof store.getState
  ): Promise<void> => {
    let data;
    try {
      data = await invoke("load_vacations");
    } catch (err) {
      invoke("log_error", {
        target: "vacations",
        message: `Loading of Vacations data from database failed: ${err}`,
        location:
          "state/action-creators/vacationsDataActionCreators.ts-loadVacationsData",
      });
    }

    let validatedVacData: VacationsData;
    try {
      validatedVacData = await validateVacationsData(data);
    } catch (err) {
      invoke("log_error", {
        target: "vacations",
        message: `Vacations data validation failed: ${err}`,
        location:
          "state/action-creators/vacationsDataActionCreators.ts-loadVacationsData",
      });
      return;
    }

    let validatedUsersData: UsersData;
    try {
      validatedUsersData = await validateUsersData(data);
    } catch (err) {
      invoke("log_error", {
        target: "vacations",
        message: `Users data validation failed: ${err}`,
        location:
          "state/action-creators/vacationsDataActionCreators.ts-updateVacationsData",
      });
      return;
    }

    batch(() => {
      dispatch(loadVacationsDataAction(validatedVacData));
      dispatch(loadUsersDataAction(validatedUsersData));
      dispatch(updateCalendarRowUserMapAction(getState().usersData));
    });
  };

export const updateVacationsDataAction = (
  payload: VacationsData
): VacationsDataAction => ({
  type: VacationsDataActionType.UPDATE,
  payload,
});

interface UpdatePayload {
  newEntries?: NewVacationData[];
  updatedEntries?: VacationDataPayload[];
  removedEntries?: string[];
}

export const updateVacationsData =
  ({ newEntries, updatedEntries, removedEntries }: UpdatePayload) =>
  async (
    dispatch: Dispatch<
      VacationsDataAction | UsersDataAction | CalendarRowUserMapAction
    >,
    getState: typeof store.getState
  ): Promise<void> => {
    let data;
    try {
      data = await invoke("update_vacations", {
        newEntries: newEntries ?? null,
        updatedEntries: updatedEntries ?? null,
        removedEntries: removedEntries ?? null,
      });
    } catch (err) {
      invoke("log_error", {
        target: "vacations",
        message: `Updating Vacations data in database failed: ${err}`,
        location:
          "state/action-creators/vacationsDataActionCreators.ts-updateVacationsData",
      });
    }

    let validatedVacData: VacationsData;
    try {
      validatedVacData = await validateVacationsData(data);
    } catch (err) {
      invoke("log_error", {
        target: "vacations",
        message: `Vacations data validation failed: ${err}`,
        location:
          "state/action-creators/vacationsDataActionCreators.ts-updateVacationsData",
      });
      return;
    }

    let validatedUsersData: UsersData;
    try {
      validatedUsersData = await validateUsersData(data);
    } catch (err) {
      invoke("log_error", {
        target: "vacations",
        message: `Users data validation failed: ${err}`,
        location:
          "state/action-creators/vacationsDataActionCreators.ts-updateVacationsData",
      });
      return;
    }

    batch(() => {
      dispatch(updateVacationsDataAction(validatedVacData));
      dispatch(loadUsersDataAction(validatedUsersData));
      dispatch(updateCalendarRowUserMapAction(getState().usersData));
    });
  };
