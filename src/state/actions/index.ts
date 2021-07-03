import { LocalConfigPayload } from "../utils/localConfig";

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

export type SideMenuDatabaseAction = {
  type: string;
};

export type ThemeAction = {
  type: string;
};
