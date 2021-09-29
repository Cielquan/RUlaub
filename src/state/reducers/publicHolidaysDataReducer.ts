import { PublicHolidaysDataActionType } from "../action-types";
import { PublicHolidaysDataAction } from "../actions";
import { publicHolidaysDataInitState as initState } from "./initialStates";
import {
  PublicHolidaysData,
  updatePublicHolidaysData,
} from "../utils/publicHolidaysData";

const reducer = (
  state: PublicHolidaysData = initState,
  action: PublicHolidaysDataAction
): PublicHolidaysData => {
  switch (action.type) {
    case PublicHolidaysDataActionType.LOAD:
      return action.payload;
    case PublicHolidaysDataActionType.UPDATE:
      return updatePublicHolidaysData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
