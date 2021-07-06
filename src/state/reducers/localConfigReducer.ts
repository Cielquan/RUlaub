import { LocalConfigType } from "../action-types";
import { LocalConfigAction } from "../actions";
import { LocalConfig, updateLocalConfig } from "../utils/localConfig";

import localConfig from "../../dev_temp/test.local_config.json";

const initialState = localConfig as LocalConfig;

const reducer = (
  state: LocalConfig = initialState,
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
