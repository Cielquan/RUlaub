import { PublicHolidaysDataActionType } from "../action-types";
import { PublicHolidaysDataAction } from "../actions";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
import { publicHolidaysDataInitState as initState } from "./initialStates";
import { updatePublicHolidaysData } from "../utils/publicHolidaysData";

const reducer = (
  state: PublicHolidaysData = initState,
  action: PublicHolidaysDataAction
): PublicHolidaysData => {
  switch (action.type) {
    case PublicHolidaysDataActionType.ADD:
      return action.payload;
    case PublicHolidaysDataActionType.LOAD:
      return action.payload;
    case PublicHolidaysDataActionType.REMOVE:
      return action.payload;
    case PublicHolidaysDataActionType.UPDATE:
      return updatePublicHolidaysData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
