import { LocalConfigType } from "../action-types";
import { LocalConfigAction } from "../actions";
import { localConfigInitState as initState } from "./initialStates";
import { LocalConfig, updateLocalConfig } from "../utils/localConfig";

const reducer = (
  state: LocalConfig = initState,
  action: LocalConfigAction
): LocalConfig => {
  switch (action.type) {
    case LocalConfigType.UPDATE:
      return updateLocalConfig(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
