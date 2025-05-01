import { PublicHolidaysDataLoadingDepthActionType } from "../action-types";
import { PublicHolidaysDataLoadingDepthAction } from "../actions";
import {
  LoadingDepth,
  publicHolidaysDataLoadingDepthInitState as initState,
} from "./initialStates";

const reducer = (
  state: LoadingDepth = initState,
  action: PublicHolidaysDataLoadingDepthAction
): LoadingDepth => {
  switch (action.type) {
    case PublicHolidaysDataLoadingDepthActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
