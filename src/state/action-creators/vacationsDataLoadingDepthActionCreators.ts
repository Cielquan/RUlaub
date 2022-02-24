import { Dispatch } from "redux";

import { VacationsDataLoadingDepthActionType } from "../action-types";
import { VacationsDataLoadingDepthAction } from "../actions";

export const currentYearVacationsDataLoadingDepthAction = (): VacationsDataLoadingDepthAction => ({
  type: VacationsDataLoadingDepthActionType.CURRENT_YEAR,
});

export const loadOnlyCurrentYearVacationsData =
  () =>
  (dispatch: Dispatch<VacationsDataLoadingDepthAction>): void => {
    dispatch(currentYearVacationsDataLoadingDepthAction());
  };

export const fullVacationsDataLoadingDepthAction = (): VacationsDataLoadingDepthAction => ({
  type: VacationsDataLoadingDepthActionType.FULL,
});

export const loadAllVacationsData =
  () =>
  (dispatch: Dispatch<VacationsDataLoadingDepthAction>): void => {
    dispatch(fullVacationsDataLoadingDepthAction());
  };
