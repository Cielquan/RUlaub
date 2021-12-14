import { invoke } from "@tauri-apps/api/tauri";
import { Dispatch } from "redux";

import { SchoolHolidaysDataActionType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import {
  NewSchoolHolidayData,
  SchoolHolidayDataPayload,
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

export const updateSchoolHolidaysData =
  (
    newEntries: NewSchoolHolidayData[],
    updatedEntries: SchoolHolidayDataPayload[],
    removedEntries: string[]
  ) =>
  async (dispatch: Dispatch<SchoolHolidaysDataAction>): Promise<void> => {
    let data;
    try {
      data = await invoke("update_school_holidays", {
        newEntries,
        updatedEntries,
        removedEntries,
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
