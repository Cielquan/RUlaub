import { invoke } from "@tauri-apps/api/tauri";
import { Dispatch } from "redux";

import { SchoolHolidaysDataActionType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import {
  NewSchoolHolidayData,
  SchoolHolidayDataMap,
} from "../../backendAPI/types/helperTypes";
import { validateSchoolHolidaysData } from "../../backendAPI/validation";

export const loadSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.LOAD,
  payload,
});

export const loadSchoolHolidaysData =
  () =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("load_school_holidays");
    } catch (err) {
      invoke("log_error", {
        target: "school-holidays",
        message: `Loading of SchoolHolidays data from database failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/schoolHolidaysDataActionCreators.ts-loadSchoolHolidaysData",
      });
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
  newEntries: NewSchoolHolidayData[] | undefined;
  updatedEntries: SchoolHolidayDataMap | undefined;
  removedEntries: string[] | undefined;
}

export const updateSchoolHolidaysData =
  ({ newEntries, updatedEntries, removedEntries }: UpdatePayload) =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("update_school_holidays", {
        newEntries: newEntries ?? null,
        updatedEntries: updatedEntries ?? null,
        removedEntries: removedEntries ?? null,
      });
    } catch (err) {
      invoke("log_error", {
        target: "school-holidays",
        message: `Updating SchoolHolidays data in database failed: ${err}`,
        location:
          // eslint-disable-next-line max-len
          "state/action-creators/schoolHolidaysDataActionCreators.ts-updateSchoolHolidaysData",
      });
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
