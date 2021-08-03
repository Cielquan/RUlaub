import { DBDataPayload } from "../utils/dbData";
import { LocalConfigPayload } from "../utils/localConfig";

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

export type LocalConfigAction = {
  type: string;
  payload: LocalConfigPayload;
};

export type SideMenuAction = {
  type: string;
};

export type ThemeAction = {
  type: string;
};
