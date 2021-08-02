import { LanguageType } from "../action-types";
import { LanguageAction } from "../actions";
import { defaultLanguage, Language, Languages } from "../../i18n";

const initialState = defaultLanguage;

const reducer = (state: Language = initialState, action: LanguageAction): Language => {
  switch (action.type) {
    case LanguageType.DE:
      return Languages.german;
    case LanguageType.EN:
      return Languages.english;
    default:
      return state;
  }
};

export default reducer;
