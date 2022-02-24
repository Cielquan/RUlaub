import { Dispatch } from "redux";

import { VacationsDataLoadingDepthActionType } from "../action-types";
import { VacationsDataLoadingDepthAction } from "../actions";
import { LoadingDepth } from "../reducers/initialStates";

export const setVacationsDataLoadingDepthAction = (
  payload: LoadingDepth
): VacationsDataLoadingDepthAction => ({
  type: VacationsDataLoadingDepthActionType.UPDATE,
  payload,
});

export const setVacationsDataLoadingDepth =
  (loadingDepth: LoadingDepth) =>
  (dispatch: Dispatch<VacationsDataLoadingDepthAction>): void => {
    dispatch(setVacationsDataLoadingDepthAction(loadingDepth));
  };
