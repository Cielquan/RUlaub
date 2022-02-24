import { Dispatch } from "redux";

import { PublicHolidaysDataLoadingDepthActionType } from "../action-types";
import { PublicHolidaysDataLoadingDepthAction } from "../actions";
import { LoadingDepth } from "../reducers/initialStates";

export const setPublicHolidaysDataLoadingDepthAction = (
  payload: LoadingDepth
): PublicHolidaysDataLoadingDepthAction => ({
  type: PublicHolidaysDataLoadingDepthActionType.UPDATE,
  payload,
});

export const setPublicHolidaysDataLoadingDepth =
  (loadingDepth: LoadingDepth) =>
  (dispatch: Dispatch<PublicHolidaysDataLoadingDepthAction>): void => {
    dispatch(setPublicHolidaysDataLoadingDepthAction(loadingDepth));
  };
