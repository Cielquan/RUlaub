import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { VacationStatsDataSchema as VacationStatsData } from "../../backendAPI/types/vacationStatsData.schema";
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";
import { VacationsDataSchema as VacationsData } from "../../backendAPI/types/vacationsData.schema";

export interface CalendarRowUserMap {
  [k: string]: number;
}

export enum DBInitLoadState {
  NOT_LOADED,
  OK,
  NO_URI_SET,
  NO_FILE_FOUND,
  ERR,
}

export interface DownloadSchoolHolidaysDialogCloseState {
  open: boolean;
}

export interface DownloadSchoolHolidaysDialogOpenState {
  open: boolean;
  year: number;
}

export type DownloadSchoolHolidaysDialogState =
  | DownloadSchoolHolidaysDialogCloseState
  | DownloadSchoolHolidaysDialogOpenState;

export function downloadSchoolHolidaysDialogIsOpen(
  state: DownloadSchoolHolidaysDialogState
): state is DownloadSchoolHolidaysDialogOpenState {
  return state.open;
}

export type LoadingDepth = "CurrentYear" | "Full";

export const aboutPageInitState = false;
export const addVacationDialogInitState = false;
export const calendarRowUserMapInitState: CalendarRowUserMap = {};
export const configInitState = null;
export const createDBDialogInitState = false;
export const dbInitLoadInitState = DBInitLoadState.NOT_LOADED;
export const downloadSchoolHolidaysDialogInitState: DownloadSchoolHolidaysDialogState = {
  open: false,
};
export const publicHolidaysDataInitState: PublicHolidaysData = {};
export const publicHolidaysDataLoadingDepthInitState: LoadingDepth = "CurrentYear";
export const publicHolidaysDialogInitState = false;
export const schoolHolidaysDataInitState: SchoolHolidaysData = {};
export const schoolHolidaysDataLoadingDepthInitState: LoadingDepth = "CurrentYear";
export const schoolHolidaysDialogInitState = false;
export const schoolHolidaysLinkInitState = null;
export const settingsDialogInitState = false;
export const sideMenuInitState = false;
export const usersDataInitState: UsersData = {};
export const usersDialogInitState = false;
export const vacationsDataInitState: VacationsData = {};
export const vacationsDataLoadingDepthInitState: LoadingDepth = "CurrentYear";
export const vacationsDialogInitState = false;
export const vacationStatsDataInitState: VacationStatsData = {};
export const vacationTypesDataInitState: VacationTypesData = {};
export const vacationTypesDialogInitState = false;
