import { Language } from "./i18n";
import { SupportedThemes } from "../../theme";
import { LogLevel } from "../../backendAPI/types/configFile.schema";

export enum LogLevels {
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

export interface UserConfig {
  name: string | undefined;
}

export interface SettingsConfig {
  databaseURI: string | undefined;
  yearToShow: number | undefined;
  theme: SupportedThemes;
  language: Language;
  logLevel: LogLevel;
  todayAutoscrollLeftOffset: number;
  yearChangeScrollBegin: boolean;
}

export interface Config {
  user: UserConfig;
  settings: SettingsConfig;
}

export interface ConfigPayload {
  user?: Partial<UserConfig>;
  settings?: Partial<SettingsConfig>;
}

export const updateConfig = (
  currentConfig: Config,
  updatePayload: ConfigPayload
): Config => {
  const rv: Config = JSON.parse(JSON.stringify(currentConfig));

  if ("user" in updatePayload) {
    rv.user = { ...rv.user, ...updatePayload.user };
  }
  if ("settings" in updatePayload) {
    rv.settings = { ...rv.settings, ...updatePayload.settings };
  }

  return rv;
};
