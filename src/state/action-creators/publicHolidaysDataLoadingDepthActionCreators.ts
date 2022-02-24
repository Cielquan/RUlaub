import { Dispatch } from "redux";

import { PublicHolidaysDataLoadingDepthActionType } from "../action-types";
import { PublicHolidaysDataLoadingDepthAction } from "../actions";

export const currentYearPublicHolidaysDataLoadingDepthAction =
  (): PublicHolidaysDataLoadingDepthAction => ({
    type: PublicHolidaysDataLoadingDepthActionType.CURRENT_YEAR,
  });

export const loadOnlyCurrentYearPublicHolidaysData =
  () =>
  (dispatch: Dispatch<PublicHolidaysDataLoadingDepthAction>): void => {
    dispatch(currentYearPublicHolidaysDataLoadingDepthAction());
  };

export const fullPublicHolidaysDataLoadingDepthAction =
  (): PublicHolidaysDataLoadingDepthAction => ({
    type: PublicHolidaysDataLoadingDepthActionType.FULL,
  });

export const loadAllPublicHolidaysData =
  () =>
  (dispatch: Dispatch<PublicHolidaysDataLoadingDepthAction>): void => {
    dispatch(fullPublicHolidaysDataLoadingDepthAction());
  };
