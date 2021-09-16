export type SupportedLocales = "de-DE" | "en-US";
export type SupportedLocalesShorted = "deDE" | "enUS";

export interface Language {
  name: string;
  locale: SupportedLocales;
  importName: SupportedLocalesShorted;
}

export const Languages: { [key: string]: Language } = {
  german: {
    name: "Deutsch",
    locale: "de-DE",
    importName: "deDE",
  },
  english: {
    name: "English",
    locale: "en-US",
    importName: "enUS",
  },
};

export const localeToLanguage = (locale: SupportedLocales): Language =>
  Object.values(Languages).filter((lang) => lang.locale === locale)[0];

export default Languages;
