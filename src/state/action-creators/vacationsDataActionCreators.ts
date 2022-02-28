import { invoke } from "@tauri-apps/api";
import { ProviderContext } from "notistack";
import { batch } from "react-redux";
import { Dispatch } from "redux";

import { loadUsersDataAction, updateCalendarRowUserMapAction } from ".";
import { store } from "..";
import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { NewVacationData, VacationDataMap } from "../../backendAPI/types/helperTypes";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { VacationsDataSchema as VacationsData } from "../../backendAPI/types/vacationsData.schema";
import { validateUsersData, validateVacationsData } from "../../backendAPI/validation";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";
import { VacationsDataActionType } from "../action-types";
import { CalendarRowUserMapAction, UsersDataAction, VacationsDataAction } from "../actions";
import { LoadingDepth } from "../reducers/initialStates";

export const loadVacationsDataAction = (payload: VacationsData): VacationsDataAction => ({
  type: VacationsDataActionType.LOAD,
  payload,
});

export const loadVacationsData =
  (snackbarHandles: ProviderContext, loadingDepth: LoadingDepth = "CurrentYear") =>
  async (
    dispatch: Dispatch<VacationsDataAction | UsersDataAction | CalendarRowUserMapAction>,
    getState: typeof store.getState
  ): Promise<void> => {
    let data;
    try {
      data = await invoke("load_vacations", { load_all_data: loadingDepth === "Full" });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let validatedVacData: VacationsData;
    try {
      validatedVacData = await validateVacationsData(data);
    } catch (err) {
      invoke("log_error", {
        target: "vacations",
        message: "Vacations data validation failed",
        location: "state/action-creators/vacationsDataActionCreators.ts-loadVacationsData",
        errObjectString: JSON.stringify(err),
      });
      return;
    }

    try {
      data = await invoke("load_users");
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let validatedUsersData: UsersData;
    try {
      validatedUsersData = await validateUsersData(data);
    } catch (err) {
      invoke("log_error", {
        target: "vacations",
        message: "Users data validation failed",
        location: "state/action-creators/vacationsDataActionCreators.ts-updateVacationsData",
        errObjectString: JSON.stringify(err),
      });
      return;
    }

    batch(() => {
      dispatch(loadVacationsDataAction(validatedVacData));
      dispatch(loadUsersDataAction(validatedUsersData));
      dispatch(updateCalendarRowUserMapAction(getState().usersData));
    });
  };

export const updateVacationsDataAction = (payload: VacationsData): VacationsDataAction => ({
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
    snackbarHandles: ProviderContext,
    loadingDepth: LoadingDepth = "CurrentYear"
  ) =>
  async (dispatch: Dispatch<VacationsDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("update_vacations", {
        newEntries: newEntries ?? null,
        updatedEntries: updatedEntries ?? null,
        removedEntries: removedEntries ?? null,
        load_all_data: loadingDepth === "Full",
      });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let validatedVacData: VacationsData;
    try {
      validatedVacData = await validateVacationsData(data);
    } catch (err) {
      invoke("log_error", {
        target: "vacations",
        message: "Vacations data validation failed",
        location: "state/action-creators/vacationsDataActionCreators.ts-updateVacationsData",
        errObjectString: JSON.stringify(err),
      });
      return;
    }

    dispatch(updateVacationsDataAction(validatedVacData));
  };
