import { VacationDataPayload } from "../utils/vacationData";
import { ConfigPayload } from "../utils/config";

export type ConfigAction = {
  type: string;
  payload: ConfigPayload;
};

export type InfoPageAction = {
  type: string;
};

export type SideMenuAction = {
  type: string;
};

export type VacationDataAction = {
  type: string;
  payload: VacationDataPayload;
};
