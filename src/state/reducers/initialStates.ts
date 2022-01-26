import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { VacationsDataSchema as VacationsData } from "../../backendAPI/types/vacationsData.schema";
import { VacationStatsDataSchema as VacationStatsData } from "../../backendAPI/types/vacationStatsData.schema";
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";

export interface CalendarRowUserMap {
  [k: string]: number;
}

export const aboutPageInitState = false;
export const addVacationDialogInitState = false;
export const calendarRowUserMapInitState: CalendarRowUserMap = {};
export const configInitState = null;
export const publicHolidaysDataInitState: PublicHolidaysData = {};
export const publicHolidaysDialogInitState = false;
export const schoolHolidaysDataInitState: SchoolHolidaysData = {};
export const schoolHolidaysDialogInitState = false;
export const schoolHolidaysLinkInitState = null;
export const settingsDialogInitState = false;
export const sideMenuInitState = false;
export const usersDataInitState: UsersData = {};
export const usersDialogInitState = false;
export const vacationsDataInitState: VacationsData = {};
export const vacationsDialogInitState = false;
export const vacationStatsDataInitState: VacationStatsData = {};
export const vacationTypesDataInitState: VacationTypesData = {};
export const vacationTypesDialogInitState = false;
