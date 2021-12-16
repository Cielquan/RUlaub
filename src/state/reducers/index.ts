import { combineReducers } from "redux";

import aboutPageReducer from "./aboutPageReducer";
import addVacationDialogReducer from "./addVacationDialogReducer";
import calendarRowUserMapReducer from "./calendarRowUserMapReducer";
import configReducer from "./configReducer";
import {
  aboutPageInitState,
  addVacationDialogInitState,
  calendarRowUserMapInitState,
  configInitState,
  publicHolidaysDataInitState,
  publicHolidaysDialogInitState,
  schoolHolidaysDataInitState,
  schoolHolidaysDialogInitState,
  settingsDialogInitState,
  sideMenuInitState,
  usersDialogInitState,
  usersDataInitState,
  vacationsDataInitState,
  vacationsDialogInitState,
  vacationTypesDataInitState,
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
import vacationsDataReducer from "./vacationsDataReducer";
import vacationsDialogReducer from "./vacationsDialogReducer";
import vacationTypesDataReducer from "./vacationTypesDataReducer";
import vacationTypesDialogReducer from "./vacationTypesDialogReducer";

const rootReducer = combineReducers({
  aboutPage: aboutPageReducer,
  addVacationDialog: addVacationDialogReducer,
  calendarRowUserMap: calendarRowUserMapReducer,
  config: configReducer,
  publicHolidaysData: publicHolidaysDataReducer,
  publicHolidaysDialog: publicHolidaysDialogReducer,
  schoolHolidaysData: schoolHolidaysDataReducer,
  schoolHolidaysDialog: schoolHolidaysDialogReducer,
  settingsDialog: settingsDialogReducer,
  sideMenu: sideMenuReducer,
  usersData: usersDataReducer,
  usersDialog: usersDialogReducer,
  vacationsData: vacationsDataReducer,
  vacationsDialog: vacationsDialogReducer,
  vacationTypesData: vacationTypesDataReducer,
  vacationTypesDialog: vacationTypesDialogReducer,
});

export type State = ReturnType<typeof rootReducer>;

export const initialState: State = {
  aboutPage: aboutPageInitState,
  addVacationDialog: addVacationDialogInitState,
  calendarRowUserMap: calendarRowUserMapInitState,
  config: configInitState,
  publicHolidaysData: publicHolidaysDataInitState,
  publicHolidaysDialog: publicHolidaysDialogInitState,
  schoolHolidaysData: schoolHolidaysDataInitState,
  schoolHolidaysDialog: schoolHolidaysDialogInitState,
  settingsDialog: settingsDialogInitState,
  sideMenu: sideMenuInitState,
  usersData: usersDataInitState,
  usersDialog: usersDialogInitState,
  vacationsData: vacationsDataInitState,
  vacationsDialog: vacationsDialogInitState,
  vacationTypesData: vacationTypesDataInitState,
  vacationTypesDialog: vacationTypesDialogInitState,
};

export default rootReducer;
