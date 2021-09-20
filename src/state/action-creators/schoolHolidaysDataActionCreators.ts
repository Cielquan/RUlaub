import { Dispatch } from "redux";

import { SchoolHolidaysDataActionType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
import { SchoolHolidaysDataPayload } from "../utils/schoolHolidaysData";

export const updateSchoolHolidaysDataAction = (
  payload: SchoolHolidaysDataPayload
): SchoolHolidaysDataAction => ({
  type: SchoolHolidaysDataActionType.UPDATE,
  payload,
});

export const updateSchoolHolidaysData =
  (payload: SchoolHolidaysDataPayload) =>
  (dispatch: Dispatch<SchoolHolidaysDataAction>): void => {
    dispatch(updateSchoolHolidaysDataAction(payload));
  };
