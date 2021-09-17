import { SchoolHolidaysDataType } from "../action-types";
import { SchoolHolidaysDataAction } from "../actions";
import { schoolHolidaysDataInitState as initState } from "./initialStates";
import {
  SchoolHolidaysData,
  updateSchoolHolidaysData,
} from "../utils/schoolHolidaysData";

const reducer = (
  state: SchoolHolidaysData = initState,
  action: SchoolHolidaysDataAction
): SchoolHolidaysData => {
  switch (action.type) {
    case SchoolHolidaysDataType.UPDATE:
      return updateSchoolHolidaysData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
