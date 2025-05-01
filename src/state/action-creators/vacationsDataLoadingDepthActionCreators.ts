import { ProviderContext } from "notistack";
import { batch } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { actionCreators, store } from "..";
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
  (snackbarHandles: ProviderContext, loadingDepth: LoadingDepth) =>
  async (dispatch: Dispatch, getState: typeof store.getState): Promise<void> => {
    const loadVacationsData = bindActionCreators(actionCreators.loadVacationsData, dispatch);

    batch(() => {
      dispatch(setVacationsDataLoadingDepthAction(loadingDepth));
      loadVacationsData(snackbarHandles, getState().schoolHolidaysDataLoadingDepth);
    });
  };
