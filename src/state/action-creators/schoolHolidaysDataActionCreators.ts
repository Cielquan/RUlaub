import { invoke } from "@tauri-apps/api/tauri";
import { ProviderContext } from "notistack";
import { Dispatch } from "redux";

import { SchoolHolidaysDataActionType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
import getErrorCatalogueMsg from "../../backendAPI/errorMsgCatalogue";
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import {
  NewSchoolHolidayData,
  SchoolHolidayDataMap,
} from "../../backendAPI/types/helperTypes";
import { validateSchoolHolidaysData } from "../../backendAPI/validation";
import { enqueuePersistendErrSnackbar } from "../../utils/snackbarUtils";

export const loadSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.LOAD,
  payload,
});

export const loadSchoolHolidaysData =
  (snackbarHandles: ProviderContext) =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("load_school_holidays");
    } catch (err) {
      enqueuePersistendErrSnackbar(
        getErrorCatalogueMsg(err as string),
        snackbarHandles
      );
      return;
    }

    let validatedData: SchoolHolidaysData;
    try {
      validatedData = await validateSchoolHolidaysData(data);
    } catch (err) {
      invoke("log_error", {
        target: "school-holidays",
        message: `SchoolHolidays data validation failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/schoolHolidaysDataActionCreators.ts-loadSchoolHolidaysData",
      });
      return;
    }

    dispatch(loadSchoolHolidaysDataAction(validatedData));
  };

export const updateSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.UPDATE,
  payload,
});

interface UpdatePayload {
  newEntries?: NewSchoolHolidayData[];
  updatedEntries?: SchoolHolidayDataMap;
  removedEntries?: number[];
}

export const updateSchoolHolidaysData =
  (
    { newEntries, updatedEntries, removedEntries }: UpdatePayload,
    snackbarHandles: ProviderContext
  ) =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("update_school_holidays", {
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

    let validatedData: SchoolHolidaysData;
    try {
      validatedData = await validateSchoolHolidaysData(data);
    } catch (err) {
      invoke("log_error", {
        target: "school-holidays",
        message: `SchoolHolidays data validation failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/schoolHolidaysDataActionCreators.ts-updateSchoolHolidaysData",
      });
      return;
    }

    dispatch(updateSchoolHolidaysDataAction(validatedData));
  };
