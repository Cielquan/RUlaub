import { combineReducers } from "redux";

import configReducer from "./configReducer";
import infoPageReducer from "./infoPageReducer";
import {
  infoPageInitState,
  configInitState,
  publicHolidaysDataInitState,
  publicHolidaysDialogInitState,
  schoolHolidaysDataInitState,
  settingsDialogInitState,
  sideMenuInitState,
  vacationDataInitState,
} from "./initialStates";
import publicHolidaysDataReducer from "./publicHolidaysDataReducer";
import publicHolidaysDialogReducer from "./publicHolidaysDialogReducer";
import schoolHolidaysDataReducer from "./schoolHolidaysDataReducer";
import settingsDialogReducer from "./settingsDialogReducer";
import sideMenuReducer from "./sideMenuReducer";
import vacationDataReducer from "./vacationDataReducer";

const rootReducer = combineReducers({
  config: configReducer,
  infoPage: infoPageReducer,
  publicHolidaysData: publicHolidaysDataReducer,
  publicHolidaysDialog: publicHolidaysDialogReducer,
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
  publicHolidaysDialog: publicHolidaysDialogInitState,
  settingsDialog: settingsDialogInitState,
  schoolHolidaysData: schoolHolidaysDataInitState,
  sideMenu: sideMenuInitState,
  vacationData: vacationDataInitState,
};

export default rootReducer;
