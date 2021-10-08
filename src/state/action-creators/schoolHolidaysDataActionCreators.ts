import { Dispatch } from "redux";

import { SchoolHolidaysDataActionType } from "../action-types";
import {
  SchoolHolidaysDataLoadAction,
  SchoolHolidaysDataUpdateAction,
} from "../actions";
import { load } from "../../backendAPI/schoolHolidaysData";
import {
  SchoolHolidaysData,
  SchoolHolidayDataPayload,
} from "../utils/schoolHolidaysData";

export const loadSchoolHolidaysDataAction = (
  payload: SchoolHolidaysData
): SchoolHolidaysDataLoadAction => ({
  type: SchoolHolidaysDataActionType.LOAD,
  payload,
});

export const loadSchoolHolidaysData =
  () =>
  async (dispatch: Dispatch<SchoolHolidaysDataLoadAction>): Promise<void> => {
    try {
      const data = await load();

      dispatch(loadSchoolHolidaysDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      console.error(error);
    }
  };

export const updateSchoolHolidaysDataAction = (
  payload: SchoolHolidayDataPayload
): SchoolHolidaysDataUpdateAction => ({
  type: SchoolHolidaysDataActionType.UPDATE,
  payload,
});

export const updateSchoolHolidaysData =
  (payload: SchoolHolidayDataPayload) =>
  (dispatch: Dispatch<SchoolHolidaysDataUpdateAction>): void => {
    dispatch(updateSchoolHolidaysDataAction(payload));
  };
