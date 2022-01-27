import { invoke } from "@tauri-apps/api";
import { ProviderContext } from "notistack";
import { batch } from "react-redux";
import { Dispatch } from "redux";

import { loadUsersDataAction, updateCalendarRowUserMapAction } from ".";
import { store } from "..";
import { VacationsDataActionType } from "../action-types";
import {
  CalendarRowUserMapAction,
  UsersDataAction,
  VacationsDataAction,
} from "../actions";
import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { VacationsDataSchema as VacationsData } from "../../backendAPI/types/vacationsData.schema";
import { NewVacationData, VacationDataMap } from "../../backendAPI/types/helperTypes";
import { validateUsersData, validateVacationsData } from "../../backendAPI/validation";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";

export const loadVacationsDataAction = (
  payload: VacationsData
): VacationsDataAction => ({
  type: VacationsDataActionType.LOAD,
  payload,
});

export const loadVacationsData =
  (snackbarHandles: ProviderContext) =>
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
      enqueuePersistendErrSnackbar(
        getErrorCatalogueMsg(err as string),
        snackbarHandles
      );
      return;
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

    try {
      data = await invoke("load_users");
    } catch (err) {
      enqueuePersistendErrSnackbar(
        getErrorCatalogueMsg(err as string),
        snackbarHandles
      );
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
  newEntries?: [string, NewVacationData[]];
  updatedEntries?: VacationDataMap;
  removedEntries?: number[];
}

export const updateVacationsData =
  (
    { newEntries, updatedEntries, removedEntries }: UpdatePayload,
    snackbarHandles: ProviderContext
  ) =>
  async (dispatch: Dispatch<VacationsDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("update_vacations", {
        newEntries: newEntries ?? null,
        updatedEntries: updatedEntries ?? null,
        removedEntries: removedEntries ?? null,
      });
    } catch (err) {
      enqueuePersistendErrSnackbar(
        getErrorCatalogueMsg(err as string),
        snackbarHandles
      );
      return;
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

    dispatch(updateVacationsDataAction(validatedVacData));
  };
