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
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "../../backendAPI/types/publicHolidaysData.schema";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { UsersDataSchema as UsersData } from "../../backendAPI/types/usersData.schema";
import { ConfigPayload } from "../utils/config";
import { PublicHolidayDataPayload } from "../utils/publicHolidaysData";
import { SchoolHolidayDataPayload } from "../utils/schoolHolidaysData";
import { UserDataPayload } from "../utils/usersData";

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

export type PublicHolidaysDataAddAction = {
  type: PublicHolidaysDataActionType.ADD;
  payload: PublicHolidaysData;
};

export type PublicHolidaysDataLoadAction = {
  type: PublicHolidaysDataActionType.LOAD;
  payload: PublicHolidaysData;
};

export type PublicHolidaysDataRemoveAction = {
  type: PublicHolidaysDataActionType.REMOVE;
  payload: PublicHolidaysData;
};

export type PublicHolidaysDataUpdateAction = {
  type: PublicHolidaysDataActionType.UPDATE;
  payload: PublicHolidayDataPayload[];
};

export type PublicHolidaysDataAction =
  | PublicHolidaysDataAddAction
  | PublicHolidaysDataLoadAction
  | PublicHolidaysDataRemoveAction
  | PublicHolidaysDataUpdateAction;

export type PublicHolidaysDialogAction = {
  type: PublicHolidaysDialogActionType;
};

export type SchoolHolidaysDataAddAction = {
  type: SchoolHolidaysDataActionType.ADD;
  payload: SchoolHolidaysData;
};

export type SchoolHolidaysDataLoadAction = {
  type: SchoolHolidaysDataActionType.LOAD;
  payload: SchoolHolidaysData;
};

export type SchoolHolidaysDataRemoveAction = {
  type: SchoolHolidaysDataActionType.REMOVE;
  payload: SchoolHolidaysData;
};

export type SchoolHolidaysDataUpdateAction = {
  type: SchoolHolidaysDataActionType.UPDATE;
  payload: SchoolHolidayDataPayload[];
};

export type SchoolHolidaysDataAction =
  | SchoolHolidaysDataAddAction
  | SchoolHolidaysDataLoadAction
  | SchoolHolidaysDataRemoveAction
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
  payload: UsersData;
};

export type UsersDataLoadAction = {
  type: UsersDataActionType.LOAD;
  payload: UsersData;
};

export type UsersDataRemoveAction = {
  type: UsersDataActionType.REMOVE;
  payload: UsersData;
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
