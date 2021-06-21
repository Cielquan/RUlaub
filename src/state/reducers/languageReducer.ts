import { LanguageType } from "../action-types";
import { LanguageAction } from "../actions";
import * as languages from "../../languages";

const initialState = languages.Languages.english;

const reducer = (
  state: languages.Language = initialState,
  action: LanguageAction
): languages.Language => {
  switch (action.type) {
    case LanguageType.DE:
      return languages.Languages.german;
    case LanguageType.EN:
      return languages.Languages.english;
    default:
      return state;
  }
};

export default reducer;
