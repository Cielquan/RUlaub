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
  publicHolidaysDataLoadingDepthInitState,
  publicHolidaysDialogInitState,
  schoolHolidaysDataInitState,
  schoolHolidaysDataLoadingDepthInitState,
  schoolHolidaysDialogInitState,
  schoolHolidaysLinkInitState,
  settingsDialogInitState,
  sideMenuInitState,
  usersDataInitState,
  usersDialogInitState,
  vacationStatsDataInitState,
  vacationTypesDataInitState,
  vacationTypesDialogInitState,
  vacationsDataInitState,
  vacationsDataLoadingDepthInitState,
  vacationsDialogInitState,
} from "./initialStates";
import publicHolidaysDataLoadingDepthReducer from "./publicHolidaysDataLoadingDepthReducer";
import publicHolidaysDataReducer from "./publicHolidaysDataReducer";
import publicHolidaysDialogReducer from "./publicHolidaysDialogReducer";
import schoolHolidaysDataLoadingDepthReducer from "./schoolHolidaysDataLoadingDepthReducer";
import schoolHolidaysDataReducer from "./schoolHolidaysDataReducer";
import schoolHolidaysDialogReducer from "./schoolHolidaysDialogReducer";
import schoolHolidaysLinkReducer from "./schoolHolidaysLinkReducer";
import settingsDialogReducer from "./settingsDialogReducer";
import sideMenuReducer from "./sideMenuReducer";
import usersDataReducer from "./usersDataReducer";
import usersDialogReducer from "./usersDialogReducer";
import vacationStatsDataReducer from "./vacationStatsDataReducer";
import vacationTypesDataReducer from "./vacationTypesDataReducer";
import vacationTypesDialogReducer from "./vacationTypesDialogReducer";
import vacationsDataLoadingDepthReducer from "./vacationsDataLoadingDepthReducer";
import vacationsDataReducer from "./vacationsDataReducer";
import vacationsDialogReducer from "./vacationsDialogReducer";

const rootReducer = combineReducers({
  aboutPage: aboutPageReducer,
  addVacationDialog: addVacationDialogReducer,
  calendarRowUserMap: calendarRowUserMapReducer,
  config: configReducer,
  publicHolidaysData: publicHolidaysDataReducer,
  publicHolidaysDataLoadingDepth: publicHolidaysDataLoadingDepthReducer,
  publicHolidaysDialog: publicHolidaysDialogReducer,
  schoolHolidaysData: schoolHolidaysDataReducer,
  schoolHolidaysDataLoadingDepth: schoolHolidaysDataLoadingDepthReducer,
  schoolHolidaysDialog: schoolHolidaysDialogReducer,
  schoolHolidaysLink: schoolHolidaysLinkReducer,
  settingsDialog: settingsDialogReducer,
  sideMenu: sideMenuReducer,
  usersData: usersDataReducer,
  usersDialog: usersDialogReducer,
  vacationsData: vacationsDataReducer,
  vacationsDataLoadingDepth: vacationsDataLoadingDepthReducer,
  vacationsDialog: vacationsDialogReducer,
  vacationStatsData: vacationStatsDataReducer,
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
  publicHolidaysDataLoadingDepth: publicHolidaysDataLoadingDepthInitState,
  publicHolidaysDialog: publicHolidaysDialogInitState,
  schoolHolidaysData: schoolHolidaysDataInitState,
  schoolHolidaysDataLoadingDepth: schoolHolidaysDataLoadingDepthInitState,
  schoolHolidaysDialog: schoolHolidaysDialogInitState,
  schoolHolidaysLink: schoolHolidaysLinkInitState,
  settingsDialog: settingsDialogInitState,
  sideMenu: sideMenuInitState,
  usersData: usersDataInitState,
  usersDialog: usersDialogInitState,
  vacationsData: vacationsDataInitState,
  vacationsDataLoadingDepth: vacationsDataLoadingDepthInitState,
  vacationsDialog: vacationsDialogInitState,
  vacationStatsData: vacationStatsDataInitState,
  vacationTypesData: vacationTypesDataInitState,
  vacationTypesDialog: vacationTypesDialogInitState,
};

export default rootReducer;
