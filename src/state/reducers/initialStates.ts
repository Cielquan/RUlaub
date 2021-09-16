import { SupportedThemes } from "../../theme";
import { DBData } from "../utils/dbData";
import Languages, { Language, SupportedLocales } from "../utils/i18n";
import { Config } from "../utils/config";

import dbDataJSON from "../../dev_temp/test.db.json";
// import localConfigJSON from "../../dev_temp/test.local_config.json";

export const defaultLocale: SupportedLocales = "en-US";
export const defaultTheme: SupportedThemes = "dark";

export const defaultLanguage: Language = Object.values(Languages).filter(
  (lang) => lang.locale === defaultLocale
)[0];

export const configInitState: Config = {
  user: {
    name: undefined,
  },
  settings: {
    databaseURI: undefined,
    yearToShow: undefined,
    theme: defaultTheme,
    language: defaultLanguage,
  },
};
export const dbDataInitState: DBData = dbDataJSON;
export const infoPageInitState = false;
export const sideMenuInitState = false;
