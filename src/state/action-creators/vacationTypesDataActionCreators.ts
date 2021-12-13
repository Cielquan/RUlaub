import { invoke } from "@tauri-apps/api/tauri";
import { Dispatch } from "redux";

import { VacationTypesDataActionType } from "../action-types";
import { VacationTypesDataAction } from "../actions";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";
import {
  NewVacationTypeData,
  VacationTypeDataPayload,
} from "../../backendAPI/types/helperTypes";
import { validateVacationTypesData } from "../../backendAPI/validation";

export const loadVacationTypesDataAction = (
  payload: VacationTypesData
): VacationTypesDataAction => ({
  type: VacationTypesDataActionType.LOAD,
  payload,
});

export const loadVacationTypesData =
  () =>
  async (dispatch: Dispatch<VacationTypesDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("load_vacation_types");
    } catch (err) {
      invoke("log_error", {
        target: "vacation-types",
        message: `Loading of VacationTypes data from database failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/vacationTypesDataActionCreators.ts-loadVacationTypesData",
      });
    }

    try {
      const valData = await validateVacationTypesData(data);
      dispatch(loadVacationTypesDataAction(valData));
    } catch (err) {
      invoke("log_error", {
        target: "vacation-types",
        message: `VacationTypes data validation failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/vacationTypesDataActionCreators.ts-loadVacationTypesData",
      });
    }
  };

export const updateVacationTypesDataAction = (
  payload: VacationTypesData
): VacationTypesDataAction => ({
  type: VacationTypesDataActionType.UPDATE,
  payload,
});

export const updateVacationTypesData =
  (
    newEntries: NewVacationTypeData[],
    updatedEntries: VacationTypeDataPayload[],
    removedEntries: string[]
  ) =>
  async (dispatch: Dispatch<VacationTypesDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("update_vacation_types", {
        newEntries,
        updatedEntries,
        removedEntries,
      });
    } catch (err) {
      invoke("log_error", {
        target: "vacation-types",
        message: `Updating VacationTypes data in database failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/vacationTypesDataActionCreators.ts-updateVacationTypesData",
      });
    }

    try {
      const valData = await validateVacationTypesData(data);
      dispatch(updateVacationTypesDataAction(valData));
    } catch (err) {
      invoke("log_error", {
        target: "vacation-types",
        message: `VacationTypes data validation failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/vacationTypesDataActionCreators.ts-updateVacationTypesData",
      });
    }
  };
