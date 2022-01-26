import { VacationsDataActionType } from "../action-types";
import { VacationsDataAction } from "../actions";
import { VacationsDataSchema as VacationsData } from "../../backendAPI/types/vacationsData.schema";
import { vacationsDataInitState as initState } from "./initialStates";

const reducer = (
  state: VacationsData = initState,
  action: VacationsDataAction
): VacationsData => {
  switch (action.type) {
    case VacationsDataActionType.LOAD:
    case VacationsDataActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
