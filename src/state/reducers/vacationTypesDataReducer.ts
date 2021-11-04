import { VacationTypesDataActionType } from "../action-types";
import { VacationTypesDataAction } from "../actions";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";
import { vacationTypesDataInitState as initState } from "./initialStates";
import { updateVacationTypesData } from "../utils/vacationTypesData";

const reducer = (
  state: VacationTypesData = initState,
  action: VacationTypesDataAction
): VacationTypesData => {
  switch (action.type) {
    case VacationTypesDataActionType.ADD:
      return action.payload;
    case VacationTypesDataActionType.LOAD:
      return action.payload;
    case VacationTypesDataActionType.UPDATE:
      return updateVacationTypesData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
