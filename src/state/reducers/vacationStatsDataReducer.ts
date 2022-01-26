import { VacationStatsDataActionType } from "../action-types";
import { VacationStatsDataAction } from "../actions";
import { VacationStatsDataSchema as VacationStatsData } from "../../backendAPI/types/vacationStatsData.schema";
import { vacationStatsDataInitState as initState } from "./initialStates";

const reducer = (
  state: VacationStatsData = initState,
  action: VacationStatsDataAction
): VacationStatsData => {
  switch (action.type) {
    case VacationStatsDataActionType.LOAD:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
