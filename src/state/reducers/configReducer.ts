import { ConfigActionType } from "../action-types";
import { ConfigAction } from "../actions";
import { ConfigFileSchema as ConfigFile } from "../../backendAPI/types/configFile.schema";
import { configInitState as initState } from "./initialStates";

const reducer = (
  state: ConfigFile | null = initState,
  action: ConfigAction
): ConfigFile | null => {
  switch (action.type) {
    case ConfigActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
