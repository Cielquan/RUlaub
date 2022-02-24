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
    case PublicHolidaysDataLoadingDepthActionType.CURRENT_YEAR:
      return "CurrentYear";
    case PublicHolidaysDataLoadingDepthActionType.FULL:
      return "Full";
    default:
      return state;
  }
};

export default reducer;
