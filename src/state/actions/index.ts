import { ConfigPayload } from "../utils/config";
import { VacationDataPayload } from "../utils/vacationData";
import { PublicHolidaysDataPayload } from "../utils/publicHolidaysData";
import { SchoolHolidaysDataPayload } from "../utils/schoolHolidaysData";

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

export type VacationDataAction = {
  type: string;
  payload: VacationDataPayload;
};
