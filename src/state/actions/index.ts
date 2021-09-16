import { DBDataPayload } from "../utils/dbData";
import { ConfigPayload } from "../utils/config";

export type ConfigAction = {
  type: string;
  payload: ConfigPayload;
};

export type DBDataAction = {
  type: string;
  payload: DBDataPayload;
};

export type InfoPageAction = {
  type: string;
};

export type LanguageAction = {
  type: string;
};

export type SideMenuAction = {
  type: string;
};

export type ThemeAction = {
  type: string;
};
