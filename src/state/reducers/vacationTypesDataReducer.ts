import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";
import { VacationTypesDataActionType } from "../action-types";
import { VacationTypesDataAction } from "../actions";
import { vacationTypesDataInitState as initState } from "./initialStates";

const reducer = (
  state: VacationTypesData = initState,
  action: VacationTypesDataAction
): VacationTypesData => {
  switch (action.type) {
    case VacationTypesDataActionType.ADD:
    case VacationTypesDataActionType.LOAD:
    case VacationTypesDataActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
