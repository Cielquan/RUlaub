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
  VacationTypesDialogActionType,
} from "../action-types";
import { ConfigPayload } from "../utils/config";
import { PublicHolidaysDataPayload } from "../utils/publicHolidaysData";
import { SchoolHolidaysDataPayload } from "../utils/schoolHolidaysData";
import { UsersDataPayload } from "../utils/usersData";
import { UsersDataSchema } from "../../types/usersData.schema";

export type CalendarRowUserMapAction = {
  type: CalendarRowUserMapActionType;
  payload: UsersDataSchema;
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
  payload: PublicHolidaysDataPayload;
};

export type PublicHolidaysDialogAction = {
  type: PublicHolidaysDialogActionType;
};

export type SchoolHolidaysDataAction = {
  type: SchoolHolidaysDataActionType;
  payload: SchoolHolidaysDataPayload;
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
  payload: UsersDataPayload;
};

export type UsersDialogAction = {
  type: UsersDialogActionType;
};

export type VacationDialogAction = {
  type: VacationDialogActionType;
};

export type VacationTypesDialogAction = {
  type: VacationTypesDialogActionType;
};
