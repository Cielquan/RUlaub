import { SupportedThemes } from "../../theme";
import { VacationData } from "../utils/vacationData";
import { localeToLanguage, SupportedLocales } from "../utils/i18n";
import { Config } from "../utils/config";
import { SchoolHolidaysData } from "../utils/schoolHolidaysData";

// import dbDataJSON from "../../dev_temp/test.db.json";
// import localConfigJSON from "../../dev_temp/test.local_config.json";

export const defaultLocale: SupportedLocales = "en-US";
export const defaultTheme: SupportedThemes = "dark";

export const defaultLanguage = localeToLanguage(defaultLocale);

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
export const infoPageInitState = false;
export const schoolHolidaysDataInitState: SchoolHolidaysData = [];
export const sideMenuInitState = false;
export const vacationDataInitState: VacationData = [];
