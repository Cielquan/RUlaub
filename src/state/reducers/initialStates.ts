import {
  LogLevel,
  SupportedLanguages,
  SupportedThemes,
} from "../../backendAPI/types/configFile.schema";
import { LogLevels } from "../utils/config";
import Languages from "../utils/i18n";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";

// NOTE: Change defaults also in backend initial Config
// FIXME:#i# unknown bug when setting to 'de-DE'
export const defaultLocale: SupportedLanguages = "en-US";
export const defaultLogLevel: LogLevel = LogLevels.INFO;
export const defaultScrollLeftOffset = 2;
export const defaultScrollYearBegin = true;
export const defaultTheme: SupportedThemes = "dark";

export const defaultLanguage = Object.values(Languages).filter(
  (lang) => lang.locale === defaultLocale
)[0];

export interface CalendarRowUserMap {
  [k: string]: number;
}

export const aboutPageInitState = false;
export const calendarRowUserMapInitState: CalendarRowUserMap = {};
export const configInitState = undefined;
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
