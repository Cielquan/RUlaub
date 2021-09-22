import { SupportedThemes } from "../../theme";
import { VacationData } from "../utils/vacationData";
import { localeToLanguage, SupportedLocales } from "../utils/i18n";
import { Config } from "../utils/config";
import { PublicHolidaysData } from "../utils/publicHolidaysData";
import { SchoolHolidaysData } from "../utils/schoolHolidaysData";

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
export const publicHolidaysDataInitState: PublicHolidaysData = [];
export const schoolHolidaysDataInitState: SchoolHolidaysData = [];
export const settingsDialogInitState = false;
export const sideMenuInitState = false;
export const vacationDataInitState: VacationData = [];
