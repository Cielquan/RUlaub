import {
  LanguageData,
  SupportedLanguages,
} from "../../backendAPI/types/configFile.schema";

export const Languages: { [key: string]: LanguageData } = {
  german: {
    name: "Deutsch",
    locale: "de-DE",
    importName: "deDE",
    dateMask: "__.__.____",
  },
  english: {
    name: "English",
    locale: "en-US",
    importName: "enUS",
    dateMask: "__/__/____",
  },
};

export const localeToLanguage = (locale: SupportedLanguages): LanguageData =>
  Object.values(Languages).filter((lang) => lang.locale === locale)[0];

export default Languages;
