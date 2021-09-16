import { combineReducers } from "redux";

import configReducer from "./configReducer";
import dbDataReducer from "./dbDataReducer";
import infoPageReducer from "./infoPageReducer";
import {
  dbDataInitState,
  infoPageInitState,
  languageInitState,
  configInitState,
  sideMenuInitState,
  themeInitState,
} from "./initialStates";
import languageReducer from "./languageReducer";
import sideMenuReducer from "./sideMenuReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  dbData: dbDataReducer,
  infoPage: infoPageReducer,
  language: languageReducer,
  localConfig: configReducer,
  sideMenu: sideMenuReducer,
  theme: themeReducer,
});

export type State = ReturnType<typeof rootReducer>;

export const initialState: State = {
  dbData: dbDataInitState,
  infoPage: infoPageInitState,
  language: languageInitState,
  localConfig: configInitState,
  sideMenu: sideMenuInitState,
  theme: themeInitState,
};

export default rootReducer;
