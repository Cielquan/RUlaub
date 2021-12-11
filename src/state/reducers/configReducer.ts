import { ConfigActionType } from "../action-types";
import { ConfigAction } from "../actions";
// eslint-disable-next-line max-len
import { ConfigFileSchema as ConfigFile } from "../../backendAPI/types/configFile.schema";
import { configInitState as initState } from "./initialStates";

const reducer = (
  state: ConfigFile | undefined = initState,
  action: ConfigAction
): ConfigFile | undefined => {
  switch (action.type) {
    case ConfigActionType.UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
