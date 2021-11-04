import {
  CalendarRowUserMapActionType,
  ConfigActionType,
  InfoPageActionType,
  PublicHolidaysDataActionType,
  PublicHolidaysDialogActionType,
  SchoolHolidaysDataActionType,
  SchoolHolidaysDialogActionType,
  SettingsDialogActionType,
  SideMenuActionType,
  UsersDataActionType,
  UsersDialogActionType,
  VacationDialogActionType,
  VacationTypesDataActionType,
  VacationTypesDialogActionType,
} from "../action-types";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";
import { ConfigPayload } from "../utils/config";

export type CalendarRowUserMapAction = {
  type: CalendarRowUserMapActionType;
  payload: UsersData;
};

export type ConfigAction = {
  type: ConfigActionType;
  payload: ConfigPayload;
};

export type InfoPageAction = {
  type: InfoPageActionType;
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

export type VacationDialogAction = {
  type: VacationDialogActionType;
};

export type VacationTypesDataAction = {
  type: VacationTypesDataActionType;
  payload: VacationTypesData;
};

export type VacationTypesDialogAction = {
  type: VacationTypesDialogActionType;
};
