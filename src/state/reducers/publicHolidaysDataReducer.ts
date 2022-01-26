import { PublicHolidaysDataActionType } from "../action-types";
import { PublicHolidaysDataAction } from "../actions";
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
import { publicHolidaysDataInitState as initState } from "./initialStates";

const reducer = (
  state: PublicHolidaysData = initState,
  action: PublicHolidaysDataAction
): PublicHolidaysData => {
  switch (action.type) {
    case PublicHolidaysDataActionType.ADD:
    case PublicHolidaysDataActionType.LOAD:
    case PublicHolidaysDataActionType.REMOVE:
    case PublicHolidaysDataActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
