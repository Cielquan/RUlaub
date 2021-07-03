export type SupportedLocales = "deDE" | "enUS";

export interface Language {
  name: string;
  locale: SupportedLocales;
}

export const Languages: { [key: string]: Language } = {
  german: {
    name: "Deutsch",
    locale: "deDE",
  },
  english: {
    name: "English",
    locale: "enUS",
  },
};

export default Languages;
