import { combineReducers } from "redux";
import helpPageReducer from "./helpPageReducer";
import sideMenuReducer from "./sideMenuReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  darkTheme: themeReducer,
  helpPage: helpPageReducer,
  sideMenu: sideMenuReducer,
});

export default rootReducer;
export type State = ReturnType<typeof rootReducer>;
