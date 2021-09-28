import { combineReducers } from "redux";

import calendarRowUserMapReducer from "./calendarRowUserMapReducer";
import configReducer from "./configReducer";
import infoPageReducer from "./infoPageReducer";
import {
  calendarRowUserMapInitState,
  configInitState,
  infoPageInitState,
  publicHolidaysDataInitState,
  publicHolidaysDialogInitState,
  schoolHolidaysDataInitState,
  schoolHolidaysDialogInitState,
  settingsDialogInitState,
  sideMenuInitState,
  usersDialogInitState,
  usersDataInitState,
  vacationDialogInitState,
  vacationTypesDialogInitState,
} from "./initialStates";
import publicHolidaysDataReducer from "./publicHolidaysDataReducer";
import publicHolidaysDialogReducer from "./publicHolidaysDialogReducer";
import schoolHolidaysDataReducer from "./schoolHolidaysDataReducer";
import schoolHolidaysDialogReducer from "./schoolHolidaysDialogReducer";
import settingsDialogReducer from "./settingsDialogReducer";
import sideMenuReducer from "./sideMenuReducer";
import usersDataReducer from "./usersDataReducer";
import usersDialogReducer from "./usersDialogReducer";
import vacationDialogReducer from "./vacationDialogReducer";
import vacationTypesDialogReducer from "./vacationTypesDialogReducer";

const rootReducer = combineReducers({
  calendarRowUserMap: calendarRowUserMapReducer,
  config: configReducer,
  infoPage: infoPageReducer,
  publicHolidaysData: publicHolidaysDataReducer,
  publicHolidaysDialog: publicHolidaysDialogReducer,
  schoolHolidaysData: schoolHolidaysDataReducer,
  schoolHolidaysDialog: schoolHolidaysDialogReducer,
  settingsDialog: settingsDialogReducer,
  sideMenu: sideMenuReducer,
  usersData: usersDataReducer,
  usersDialog: usersDialogReducer,
  vacationDialog: vacationDialogReducer,
  vacationTypesDialog: vacationTypesDialogReducer,
});

export type State = ReturnType<typeof rootReducer>;

export const initialState: State = {
  calendarRowUserMap: calendarRowUserMapInitState,
  config: configInitState,
  infoPage: infoPageInitState,
  publicHolidaysData: publicHolidaysDataInitState,
  publicHolidaysDialog: publicHolidaysDialogInitState,
  schoolHolidaysData: schoolHolidaysDataInitState,
  schoolHolidaysDialog: schoolHolidaysDialogInitState,
  settingsDialog: settingsDialogInitState,
  sideMenu: sideMenuInitState,
  usersData: usersDataInitState,
  usersDialog: usersDialogInitState,
  vacationDialog: vacationDialogInitState,
  vacationTypesDialog: vacationTypesDialogInitState,
};

export default rootReducer;
