import {
  AboutPageActionType,
  AddVacationDialogActionType,
  CalendarRowUserMapActionType,
  ConfigActionType,
  PublicHolidaysDataActionType,
  PublicHolidaysDialogActionType,
  SchoolHolidaysDataActionType,
  SchoolHolidaysDialogActionType,
  SchoolHolidaysLinkActionType,
  SettingsDialogActionType,
  SideMenuActionType,
  UsersDataActionType,
  UsersDialogActionType,
  VacationsDataActionType,
  VacationsDialogActionType,
  VacationStatsDataActionType,
  VacationTypesDataActionType,
  VacationTypesDialogActionType,
} from "../action-types";
// eslint-disable-next-line max-len
import { ConfigFileSchema as ConfigFile } from "../../backendAPI/types/configFile.schema";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
// eslint-disable-next-line max-len
import { VacationsDataSchema as VacationsData } from "../../backendAPI/types/vacationsData.schema";
// eslint-disable-next-line max-len
import { VacationStatsDataSchema as VacationStatsData } from "../../backendAPI/types/vacationStatsData.schema";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";

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

export type PublicHolidaysDialogAction = {
  type: PublicHolidaysDialogActionType;
};

export type SchoolHolidaysDataAction = {
  type: SchoolHolidaysDataActionType;
  payload: SchoolHolidaysData;
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
