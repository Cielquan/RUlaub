import { Dispatch } from "redux";

import { SchoolHolidaysDataLoadingDepthActionType } from "../action-types";
import { SchoolHolidaysDataLoadingDepthAction } from "../actions";
import { LoadingDepth } from "../reducers/initialStates";

export const setSchoolHolidaysDataLoadingDepthAction = (
  payload: LoadingDepth
): SchoolHolidaysDataLoadingDepthAction => ({
  type: SchoolHolidaysDataLoadingDepthActionType.UPDATE,
  payload,
});

export const setSchoolHolidaysDataLoadingDepth =
  (loadingDepth: LoadingDepth) =>
  (dispatch: Dispatch<SchoolHolidaysDataLoadingDepthAction>): void => {
    dispatch(setSchoolHolidaysDataLoadingDepthAction(loadingDepth));
  };
