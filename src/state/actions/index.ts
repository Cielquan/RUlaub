import { UserData } from "../../types/usersData.schema";
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
import {
  PublicHolidaysData,
  PublicHolidayDataPayload,
} from "../utils/publicHolidaysData";
import {
  SchoolHolidaysData,
  SchoolHolidayDataPayload,
} from "../utils/schoolHolidaysData";
import { UsersData, UserDataPayload } from "../utils/usersData";

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

export type PublicHolidaysDataLoadAction = {
  type: PublicHolidaysDataActionType.LOAD;
  payload: PublicHolidaysData;
};

export type PublicHolidaysDataUpdateAction = {
  type: PublicHolidaysDataActionType.UPDATE;
  payload: PublicHolidayDataPayload;
};

export type PublicHolidaysDataAction =
  | PublicHolidaysDataLoadAction
  | PublicHolidaysDataUpdateAction;

export type PublicHolidaysDialogAction = {
  type: PublicHolidaysDialogActionType;
};

export type SchoolHolidaysDataLoadAction = {
  type: SchoolHolidaysDataActionType.LOAD;
  payload: SchoolHolidaysData;
};

export type SchoolHolidaysDataUpdateAction = {
  type: SchoolHolidaysDataActionType.UPDATE;
  payload: SchoolHolidayDataPayload;
};

export type SchoolHolidaysDataAction =
  | SchoolHolidaysDataLoadAction
  | SchoolHolidaysDataUpdateAction;

export type SchoolHolidaysDialogAction = {
  type: SchoolHolidaysDialogActionType;
};

export type SettingsDialogAction = {
  type: SettingsDialogActionType;
};

export type SideMenuAction = {
  type: SideMenuActionType;
};

export type UsersDataAddAction = {
  type: UsersDataActionType.ADD;
  payload: UserData[];
};

export type UsersDataLoadAction = {
  type: UsersDataActionType.LOAD;
  payload: UsersData;
};

export type UsersDataRemoveAction = {
  type: UsersDataActionType.REMOVE;
  payload: string[];
};

export type UsersDataUpdateAction = {
  type: UsersDataActionType.UPDATE;
  payload: UserDataPayload[];
};

export type UsersDataAction =
  | UsersDataAddAction
  | UsersDataLoadAction
  | UsersDataRemoveAction
  | UsersDataUpdateAction;

export type UsersDialogAction = {
  type: UsersDialogActionType;
};

export type VacationDialogAction = {
  type: VacationDialogActionType;
};

export type VacationTypesDialogAction = {
  type: VacationTypesDialogActionType;
};
