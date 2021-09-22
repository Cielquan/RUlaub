import { SettingsDialogActionType } from "../action-types";
import { SettingsDialogAction } from "../actions";
import { sideMenuInitState as initState } from "./initialStates";

const reducer = (state: boolean = initState, action: SettingsDialogAction): boolean => {
  switch (action.type) {
    case SettingsDialogActionType.OPEN:
      return true;
    case SettingsDialogActionType.CLOSE:
      return false;
    default:
      return state;
  }
};

export default reducer;
