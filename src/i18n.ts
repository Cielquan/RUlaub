import { i18n } from "@lingui/core";
import { de, en } from "make-plural/plurals";
import { messages as deMessages } from "./locales/de-DE/messages";
import { messages as enMessages } from "./locales/en-US/messages";

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

export const defaultLocale: SupportedLocales = "en-US";
export const defaultLanguage: Language = Object.values(Languages).filter(
  (lang) => lang.locale === defaultLocale
)[0];

i18n.loadLocaleData({
  "de-DE": { plurals: de },
  "en-US": { plurals: en },
});
i18n.load("de-DE", deMessages);
i18n.load("en-US", enMessages);
i18n.activate(defaultLocale);

export default Languages;
