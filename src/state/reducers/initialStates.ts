import { LogLevel } from "../../backendAPI/types/configFile.schema";
import { SupportedThemes } from "../../theme";
import { Config, LogLevels } from "../utils/config";
import { localeToLanguage, SupportedLocales } from "../utils/i18n";
import { PublicHolidaysData } from "../utils/publicHolidaysData";
import { SchoolHolidaysData } from "../utils/schoolHolidaysData";
import { UsersData } from "../utils/usersData";

export const defaultLocale: SupportedLocales = "en-US";
export const defaultLogLevel: LogLevel = LogLevels.INFO;
export const defaultTheme: SupportedThemes = "dark";

export const defaultLanguage = localeToLanguage(defaultLocale);

export interface CalendarRowUserMap {
  [k: string]: number;
}

export const calendarRowUserMapInitState: CalendarRowUserMap = {};
export const configInitState: Config = {
  user: {
    name: undefined,
  },
  settings: {
    databaseURI: undefined,
    yearToShow: undefined,
    theme: defaultTheme,
    language: defaultLanguage,
    logLevel: defaultLogLevel,
  },
};
export const infoPageInitState = false;
export const publicHolidaysDataInitState: PublicHolidaysData = {};
export const publicHolidaysDialogInitState = false;
export const schoolHolidaysDataInitState: SchoolHolidaysData = {};
export const schoolHolidaysDialogInitState = false;
export const settingsDialogInitState = false;
export const sideMenuInitState = false;
export const usersDataInitState: UsersData = {};
export const usersDialogInitState = false;
export const vacationDialogInitState = false;
export const vacationTypesDialogInitState = false;
