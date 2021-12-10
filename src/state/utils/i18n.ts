import { LanguageData } from "../../backendAPI/types/configFile.schema";

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

export default Languages;
