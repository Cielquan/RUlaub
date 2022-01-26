import { SchoolHolidaysDataActionType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { schoolHolidaysDataInitState as initState } from "./initialStates";

const reducer = (
  state: SchoolHolidaysData = initState,
  action: SchoolHolidaysDataAction
): SchoolHolidaysData => {
  switch (action.type) {
    case SchoolHolidaysDataActionType.ADD:
    case SchoolHolidaysDataActionType.LOAD:
    case SchoolHolidaysDataActionType.REMOVE:
    case SchoolHolidaysDataActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
