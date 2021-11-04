import { VacationTypesDataActionType } from "../action-types";
import { VacationTypesDataAction } from "../actions";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";
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
