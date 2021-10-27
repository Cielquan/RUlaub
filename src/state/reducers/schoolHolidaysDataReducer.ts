import { SchoolHolidaysDataActionType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { schoolHolidaysDataInitState as initState } from "./initialStates";
import { updateSchoolHolidaysData } from "../utils/schoolHolidaysData";

const reducer = (
  state: SchoolHolidaysData = initState,
  action: SchoolHolidaysDataAction
): SchoolHolidaysData => {
  switch (action.type) {
    case SchoolHolidaysDataActionType.LOAD:
      return action.payload;
    case SchoolHolidaysDataActionType.UPDATE:
      return updateSchoolHolidaysData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
