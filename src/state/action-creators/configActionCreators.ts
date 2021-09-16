import { Dispatch } from "redux";

import { ConfigType } from "../action-types";
import { ConfigAction } from "../actions";
import { ConfigPayload } from "../utils/config";

export const updateConfigAction = (payload: ConfigPayload): ConfigAction => ({
  type: ConfigType.UPDATE,
  payload,
});

export const updateConfig =
  (payload: ConfigPayload) =>
  (dispatch: Dispatch<ConfigAction>): void => {
    dispatch(updateConfigAction(payload));
  };
