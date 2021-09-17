import { Dispatch } from "redux";

import { SchoolHolidaysDataType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
import { SchoolHolidaysDataPayload } from "../utils/schoolHolidaysData";

export const updateSchoolHolidaysDataAction = (
  payload: SchoolHolidaysDataPayload
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataType.UPDATE,
  payload,
});

export const updateSchoolHolidaysData =
  (payload: SchoolHolidaysDataPayload) =>
  (dispatch: Dispatch<SchoolHolidaysDataAction>): void => {
    dispatch(updateSchoolHolidaysDataAction(payload));
  };
