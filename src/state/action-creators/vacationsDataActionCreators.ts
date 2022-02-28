import { invoke } from "@tauri-apps/api";
import { ProviderContext } from "notistack";
import { Dispatch } from "redux";

import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { NewVacationData, VacationDataMap } from "../../backendAPI/types/helperTypes";
import { VacationsDataSchema as VacationsData } from "../../backendAPI/types/vacationsData.schema";
import { validateVacationsData } from "../../backendAPI/validation";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";
import { VacationsDataActionType } from "../action-types";
import { VacationsDataAction } from "../actions";
import { LoadingDepth } from "../reducers/initialStates";

export const loadVacationsDataAction = (payload: VacationsData): VacationsDataAction => ({
  type: VacationsDataActionType.LOAD,
  payload,
});

export const loadVacationsData =
  (snackbarHandles: ProviderContext, loadingDepth: LoadingDepth = "CurrentYear") =>
  async (dispatch: Dispatch<VacationsDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("load_vacations", {
        filter_current_year: loadingDepth === "CurrentYear",
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
        location: "state/action-creators/vacationsDataActionCreators.ts-loadVacationsData",
        errObjectString: JSON.stringify(err),
      });
      return;
    }

    dispatch(loadVacationsDataAction(validatedVacData));
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
        filter_current_year: loadingDepth === "CurrentYear",
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
