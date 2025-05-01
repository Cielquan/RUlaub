import { SchoolHolidaysLinkActionType } from "../action-types";
import { SchoolHolidaysLinkAction } from "../actions";
import { schoolHolidaysLinkInitState as initState } from "./initialStates";

const reducer = (
  state: string | null = initState,
  action: SchoolHolidaysLinkAction
): string | null => {
  switch (action.type) {
    case SchoolHolidaysLinkActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
