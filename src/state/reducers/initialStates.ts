import { SupportedThemes } from "../../theme";
import { DBData } from "../utils/dbData";
import Languages, { Language, SupportedLocales } from "../utils/i18n";
import { LocalConfig } from "../utils/localConfig";

import dbDataJSON from "../../dev_temp/test.db.json";
// import localConfigJSON from "../../dev_temp/test.local_config.json";

export const defaultLocale: SupportedLocales = "en-US";
export const defaultTheme: SupportedThemes = "dark";

export const defaultLanguage: Language = Object.values(Languages).filter(
  (lang) => lang.locale === defaultLocale
)[0];

export const dbDataInitState: DBData = dbDataJSON;
export const infoPageInitState = false;
export const languageInitState = defaultLanguage;
export const localConfigInitState: LocalConfig = {
  user: {
    name: undefined,
  },
  settings: {
    databaseURI: undefined,
    yearToShow: undefined,
    theme: defaultTheme,
    language: defaultLocale,
  },
};
export const sideMenuInitState = false;
export const themeInitState = defaultTheme;
