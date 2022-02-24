import { VacationsDataLoadingDepthActionType } from "../action-types";
import { VacationsDataLoadingDepthAction } from "../actions";
import { LoadingDepth, vacationsDataLoadingDepthInitState as initState } from "./initialStates";

const reducer = (
  state: LoadingDepth = initState,
  action: VacationsDataLoadingDepthAction
): LoadingDepth => {
  switch (action.type) {
    case VacationsDataLoadingDepthActionType.CURRENT_YEAR:
      return "CurrentYear";
    case VacationsDataLoadingDepthActionType.FULL:
      return "Full";
    default:
      return state;
  }
};

export default reducer;
