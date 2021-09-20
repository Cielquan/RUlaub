import { VacationDataActionType } from "../action-types";
import { VacationDataAction } from "../actions";
import { vacationDataInitState as initState } from "./initialStates";
import { VacationData, updateVacationData } from "../utils/vacationData";

const reducer = (
  state: VacationData = initState,
  action: VacationDataAction
): VacationData => {
  switch (action.type) {
    case VacationDataActionType.UPDATE:
      return updateVacationData(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
