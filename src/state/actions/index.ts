import { ConfigPayload } from "../utils/config";
import { VacationDataPayload } from "../utils/vacationData";
import { SchoolHolidaysDataPayload } from "../utils/schoolHolidaysData";

export type ConfigAction = {
  type: string;
  payload: ConfigPayload;
};

export type InfoPageAction = {
  type: string;
};

export type SchoolHolidaysDataAction = {
  type: string;
  payload: SchoolHolidaysDataPayload;
};

export type SideMenuAction = {
  type: string;
};

export type VacationDataAction = {
  type: string;
  payload: VacationDataPayload;
};
