import { LanguageType } from "../action-types";
import { LanguageAction } from "../actions";
import { Language, Languages } from "../../i18n";

const initialState = Languages.english;

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
