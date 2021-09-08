import { combineReducers } from "redux";

import dbDataReducer from "./dbDataReducer";
import infoPageReducer from "./infoPageReducer";
import {
  dbDataInitState,
  infoPageInitState,
  languageInitState,
  localConfigInitState,
  sideMenuInitState,
  themeInitState,
} from "./initialStates";
import languageReducer from "./languageReducer";
import localConfigReducer from "./localConfigReducer";
import sideMenuReducer from "./sideMenuReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  dbData: dbDataReducer,
  infoPage: infoPageReducer,
  language: languageReducer,
  localConfig: localConfigReducer,
  sideMenu: sideMenuReducer,
  theme: themeReducer,
});

export type State = ReturnType<typeof rootReducer>;

export const initialState: State = {
  dbData: dbDataInitState,
  infoPage: infoPageInitState,
  language: languageInitState,
  localConfig: localConfigInitState,
  sideMenu: sideMenuInitState,
  theme: themeInitState,
};

export default rootReducer;
