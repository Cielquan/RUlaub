import { combineReducers } from "redux";

import configReducer from "./configReducer";
import infoPageReducer from "./infoPageReducer";
import {
  infoPageInitState,
  configInitState,
  publicHolidaysDataInitState,
  schoolHolidaysDataInitState,
  settingsDialogInitState,
  sideMenuInitState,
  vacationDataInitState,
} from "./initialStates";
import publicHolidaysDataReducer from "./publicHolidaysDataReducer";
import schoolHolidaysDataReducer from "./schoolHolidaysDataReducer";
import settingsDialogReducer from "./settingsDialogReducer";
import sideMenuReducer from "./sideMenuReducer";
import vacationDataReducer from "./vacationDataReducer";

const rootReducer = combineReducers({
  config: configReducer,
  infoPage: infoPageReducer,
  publicHolidaysData: publicHolidaysDataReducer,
  schoolHolidaysData: schoolHolidaysDataReducer,
  settingsDialog: settingsDialogReducer,
  sideMenu: sideMenuReducer,
  vacationData: vacationDataReducer,
});

export type State = ReturnType<typeof rootReducer>;

export const initialState: State = {
  config: configInitState,
  infoPage: infoPageInitState,
  publicHolidaysData: publicHolidaysDataInitState,
  settingsDialog: settingsDialogInitState,
  schoolHolidaysData: schoolHolidaysDataInitState,
  sideMenu: sideMenuInitState,
  vacationData: vacationDataInitState,
};

export default rootReducer;
