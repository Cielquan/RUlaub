import { ProviderContext } from "notistack";
import { batch } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { actionCreators, store } from "..";
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
  (snackbarHandles: ProviderContext, loadingDepth: LoadingDepth) =>
  async (dispatch: Dispatch, getState: typeof store.getState): Promise<void> => {
    const loadSchoolHolidaysData = bindActionCreators(
      actionCreators.loadSchoolHolidaysData,
      dispatch
    );

    batch(() => {
      dispatch(setSchoolHolidaysDataLoadingDepthAction(loadingDepth));
      loadSchoolHolidaysData(snackbarHandles, getState().schoolHolidaysDataLoadingDepth);
    });
  };
