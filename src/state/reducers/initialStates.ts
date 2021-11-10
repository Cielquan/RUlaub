import { LogLevel } from "../../backendAPI/types/configFile.schema";
import { SupportedThemes } from "../../theme";
import { Config, LogLevels } from "../utils/config";
import { localeToLanguage, SupportedLocales } from "../utils/i18n";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";

// NOTE: Change defaults also in backend initial Config
export const defaultLocale: SupportedLocales = "de-DE";
export const defaultLogLevel: LogLevel = LogLevels.INFO;
export const defaultScrollLeftOffset = 2;
export const defaultScrollYearBegin = true;
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
    todayAutoscrollLeftOffset: defaultScrollLeftOffset,
    yearChangeScrollBegin: defaultScrollYearBegin,
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
export const vacationsDialogInitState = false;
export const vacationTypesDataInitState: VacationTypesData = {};
export const vacationTypesDialogInitState = false;
