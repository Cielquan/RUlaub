import { ProviderContext } from "notistack";
import { batch } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { actionCreators, store } from "..";
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
  (snackbarHandles: ProviderContext, loadingDepth: LoadingDepth) =>
  async (dispatch: Dispatch, getState: typeof store.getState): Promise<void> => {
    const loadPublicHolidaysData = bindActionCreators(
      actionCreators.loadPublicHolidaysData,
      dispatch
    );

    batch(() => {
      dispatch(setPublicHolidaysDataLoadingDepthAction(loadingDepth));
      loadPublicHolidaysData(snackbarHandles, getState().schoolHolidaysDataLoadingDepth);
    });
  };
