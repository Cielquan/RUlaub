import { LanguageType } from "../action-types";
import { LanguageAction } from "../actions";
import { languageInitState as initState } from "./initialStates";
import { Language, Languages } from "../utils/i18n";

const reducer = (state: Language = initState, action: LanguageAction): Language => {
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
