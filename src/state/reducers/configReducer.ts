import { ConfigActionType } from "../action-types";
import { ConfigAction } from "../actions";
import { configInitState as initState } from "./initialStates";
import { Config, updateConfig } from "../utils/config";

const reducer = (state: Config = initState, action: ConfigAction): Config => {
  switch (action.type) {
    case ConfigActionType.UPDATE:
      return updateConfig(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
