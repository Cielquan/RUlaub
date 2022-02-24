import { invoke } from "@tauri-apps/api/tauri";
import { ProviderContext } from "notistack";
import { Dispatch } from "redux";

import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { NewVacationTypeData, VacationTypeDataMap } from "../../backendAPI/types/helperTypes";
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";
import { validateVacationTypesData } from "../../backendAPI/validation";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";
import { VacationTypesDataActionType } from "../action-types";
import { VacationTypesDataAction } from "../actions";

export const loadVacationTypesDataAction = (
  payload: VacationTypesData
): VacationTypesDataAction => ({
  type: VacationTypesDataActionType.LOAD,
  payload,
});

export const loadVacationTypesData =
  (snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<VacationTypesDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("load_vacation_types");
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let validatedData: VacationTypesData;
    try {
      validatedData = await validateVacationTypesData(data);
    } catch (err) {
      invoke("log_error", {
        target: "vacation-types",
        message: `VacationTypes data validation failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/vacationTypesDataActionCreators.ts-loadVacationTypesData",
      });
      return;
    }

    dispatch(loadVacationTypesDataAction(validatedData));
  };

export const updateVacationTypesDataAction = (
  payload: VacationTypesData
): VacationTypesDataAction => ({
  type: VacationTypesDataActionType.UPDATE,
  payload,
});

interface UpdatePayload {
  newEntries?: NewVacationTypeData[];
  updatedEntries?: VacationTypeDataMap;
}

export const updateVacationTypesData =
  ({ newEntries, updatedEntries }: UpdatePayload, snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<VacationTypesDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("update_vacation_types", {
        newEntries: newEntries ?? null,
        updatedEntries: updatedEntries ?? null,
      });
    } catch (err) {
      enqueuePersistendErrSnackbar(getErrorCatalogueMsg(err as string), snackbarHandles);
      return;
    }

    let validatedData: VacationTypesData;
    try {
      validatedData = await validateVacationTypesData(data);
    } catch (err) {
      invoke("log_error", {
        target: "vacation-types",
        message: `VacationTypes data validation failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/vacationTypesDataActionCreators.ts-updateVacationTypesData",
      });
      return;
    }

    dispatch(updateVacationTypesDataAction(validatedData));
  };
