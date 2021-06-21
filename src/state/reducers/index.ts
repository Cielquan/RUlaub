import { combineReducers } from "redux";
import appInfoReducer from "./appInfoReducer";
import infoPageReducer from "./infoPageReducer";
import sideMenuReducer from "./sideMenuReducer";
import sideMenuDatabaseReducer from "./sideMenuDatabaseReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  appInfo: appInfoReducer,
  darkTheme: themeReducer,
  infoPage: infoPageReducer,
  sideMenu: sideMenuReducer,
  sideMenuDatabase: sideMenuDatabaseReducer,
});

export default rootReducer;
export type State = ReturnType<typeof rootReducer>;
