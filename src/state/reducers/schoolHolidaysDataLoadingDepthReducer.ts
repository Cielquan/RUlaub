import { SchoolHolidaysDataLoadingDepthActionType } from "../action-types";
import { SchoolHolidaysDataLoadingDepthAction } from "../actions";
import {
  LoadingDepth,
  schoolHolidaysDataLoadingDepthInitState as initState,
} from "./initialStates";

const reducer = (
  state: LoadingDepth = initState,
  action: SchoolHolidaysDataLoadingDepthAction
): LoadingDepth => {
  switch (action.type) {
    case SchoolHolidaysDataLoadingDepthActionType.CURRENT_YEAR:
      return "CurrentYear";
    case SchoolHolidaysDataLoadingDepthActionType.FULL:
      return "Full";
    default:
      return state;
  }
};

export default reducer;
