import { ConfigFileSchema as ConfigFile } from "../../backendAPI/types/configFile.schema";
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { VacationStatsDataSchema as VacationStatsData } from "../../backendAPI/types/vacationStatsData.schema";
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";
import { VacationsDataSchema as VacationsData } from "../../backendAPI/types/vacationsData.schema";
import {
  AboutPageActionType,
  AddVacationDialogActionType,
  CalendarRowUserMapActionType,
  ConfigActionType,
  PublicHolidaysDataActionType,
  PublicHolidaysDataLoadingDepthActionType,
  PublicHolidaysDialogActionType,
  SchoolHolidaysDataActionType,
  SchoolHolidaysDataLoadingDepthActionType,
  SchoolHolidaysDialogActionType,
  SchoolHolidaysLinkActionType,
  SettingsDialogActionType,
  SideMenuActionType,
  UsersDataActionType,
  UsersDialogActionType,
  VacationStatsDataActionType,
  VacationTypesDataActionType,
  VacationTypesDialogActionType,
  VacationsDataActionType,
  VacationsDataLoadingDepthActionType,
  VacationsDialogActionType,
} from "../action-types";

export type AboutPageAction = {
  type: AboutPageActionType;
};

export type AddVacationDialogAction = {
  type: AddVacationDialogActionType;
};

export type CalendarRowUserMapAction = {
  type: CalendarRowUserMapActionType;
  payload: UsersData;
};

export type ConfigAction = {
  type: ConfigActionType;
  payload: ConfigFile;
};

export type PublicHolidaysDataAction = {
  type: PublicHolidaysDataActionType;
  payload: PublicHolidaysData;
};

export type PublicHolidaysDataLoadingDepthAction = {
  type: PublicHolidaysDataLoadingDepthActionType;
};

export type PublicHolidaysDialogAction = {
  type: PublicHolidaysDialogActionType;
};

export type SchoolHolidaysDataAction = {
  type: SchoolHolidaysDataActionType;
  payload: SchoolHolidaysData;
};

export type SchoolHolidaysDataLoadingDepthAction = {
  type: SchoolHolidaysDataLoadingDepthActionType;
};

export type SchoolHolidaysDialogAction = {
  type: SchoolHolidaysDialogActionType;
};

export type SchoolHolidaysLinkAction = {
  type: SchoolHolidaysLinkActionType;
  payload: string | null;
};

export type SettingsDialogAction = {
  type: SettingsDialogActionType;
};

export type SideMenuAction = {
  type: SideMenuActionType;
};

export type UsersDataAction = {
  type: UsersDataActionType;
  payload: UsersData;
};

export type UsersDialogAction = {
  type: UsersDialogActionType;
};

export type VacationsDataAction = {
  type: VacationsDataActionType;
  payload: VacationsData;
};

export type VacationsDataLoadingDepthAction = {
  type: VacationsDataLoadingDepthActionType;
};

export type VacationsDialogAction = {
  type: VacationsDialogActionType;
};

export type VacationStatsDataAction = {
  type: VacationStatsDataActionType;
  payload: VacationStatsData;
};

export type VacationTypesDataAction = {
  type: VacationTypesDataActionType;
  payload: VacationTypesData;
};

export type VacationTypesDialogAction = {
  type: VacationTypesDialogActionType;
};
