import { Dispatch } from "redux";

import { LocalConfigType } from "../action-types";
import { LocalConfigAction } from "../actions";
import { LocalConfigPayload } from "../utils/localConfig";

// eslint-disable-next-line import/prefer-default-export
export const updateLocalConfig =
  (payload: LocalConfigPayload) =>
  (dispatch: Dispatch<LocalConfigAction>): void => {
    dispatch({
      type: LocalConfigType.UPDATE,
      payload,
    });
  };
