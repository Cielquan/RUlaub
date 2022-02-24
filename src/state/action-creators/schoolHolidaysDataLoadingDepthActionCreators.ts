import { Dispatch } from "redux";

import { SchoolHolidaysDataLoadingDepthActionType } from "../action-types";
import { SchoolHolidaysDataLoadingDepthAction } from "../actions";

export const currentYearSchoolHolidaysDataLoadingDepthAction =
  (): SchoolHolidaysDataLoadingDepthAction => ({
    type: SchoolHolidaysDataLoadingDepthActionType.CURRENT_YEAR,
  });

export const loadOnlyCurrentYearSchoolHolidaysData =
  () =>
  (dispatch: Dispatch<SchoolHolidaysDataLoadingDepthAction>): void => {
    dispatch(currentYearSchoolHolidaysDataLoadingDepthAction());
  };

export const fullSchoolHolidaysDataLoadingDepthAction =
  (): SchoolHolidaysDataLoadingDepthAction => ({
    type: SchoolHolidaysDataLoadingDepthActionType.FULL,
  });

export const loadAllSchoolHolidaysData =
  () =>
  (dispatch: Dispatch<SchoolHolidaysDataLoadingDepthAction>): void => {
    dispatch(fullSchoolHolidaysDataLoadingDepthAction());
  };
