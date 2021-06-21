import { combineReducers } from "redux";
import appInfoReducer from "./appInfoReducer";
import infoPageReducer from "./infoPageReducer";
import languageReducer from "./languageReducer";
import sideMenuReducer from "./sideMenuReducer";
import sideMenuDatabaseReducer from "./sideMenuDatabaseReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  appInfo: appInfoReducer,
  darkTheme: themeReducer,
  infoPage: infoPageReducer,
  language: languageReducer,
  sideMenu: sideMenuReducer,
  sideMenuDatabase: sideMenuDatabaseReducer,
});

export default rootReducer;
export type State = ReturnType<typeof rootReducer>;
