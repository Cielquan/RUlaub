export type SupportedLocales = "de-DE" | "en-US";
export type SupportedLocalesShorted = "deDE" | "enUS";

export interface Language {
  name: string;
  locale: SupportedLocales;
  importName: SupportedLocalesShorted;
  dateMask: string;
}

export const Languages: { [key: string]: Language } = {
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

export const localeToLanguage = (locale: SupportedLocales): Language =>
  Object.values(Languages).filter((lang) => lang.locale === locale)[0];

export default Languages;
