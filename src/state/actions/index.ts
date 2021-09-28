import { ConfigPayload } from "../utils/config";
import { UsersDataPayload } from "../utils/usersData";
import { PublicHolidaysDataPayload } from "../utils/publicHolidaysData";
import { SchoolHolidaysDataPayload } from "../utils/schoolHolidaysData";
import { UsersDataSchema } from "../../types/usersData.schema";

export type CalendarRowUserMapAction = {
  type: string;
  payload: UsersDataSchema;
};

export type ConfigAction = {
  type: string;
  payload: ConfigPayload;
};

export type InfoPageAction = {
  type: string;
};

export type PublicHolidaysDataAction = {
  type: string;
  payload: PublicHolidaysDataPayload;
};

export type PublicHolidaysDialogAction = {
  type: string;
};

export type SchoolHolidaysDataAction = {
  type: string;
  payload: SchoolHolidaysDataPayload;
};

export type SchoolHolidaysDialogAction = {
  type: string;
};

export type SettingsDialogAction = {
  type: string;
};

export type SideMenuAction = {
  type: string;
};

export type UsersDataAction = {
  type: string;
  payload: UsersDataPayload;
};

export type UsersDialogAction = {
  type: string;
};

export type VacationDialogAction = {
  type: string;
};

export type VacationTypesDialogAction = {
  type: string;
};
