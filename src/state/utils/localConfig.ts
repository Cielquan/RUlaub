import { SupportedLocales } from "./i18n";
import { SupportedThemes } from "../../theme";

export interface UserConfig {
  name: string | undefined;
}

export interface SettingsConfig {
  databaseURI: string | undefined;
  yearToShow: number | undefined;
  theme: SupportedThemes;
  language: SupportedLocales;
}

export interface LocalConfig {
  user: UserConfig;
  settings: SettingsConfig;
}

export interface LocalConfigPayload {
  user?: Partial<UserConfig>;
  settings?: Partial<SettingsConfig>;
}

export const updateLocalConfig = (
  currentConfig: LocalConfig,
  updatePayload: LocalConfigPayload
): LocalConfig => {
  const rv: LocalConfig = JSON.parse(JSON.stringify(currentConfig));

  if ("user" in updatePayload) {
    rv.user = { ...rv.user, ...updatePayload.user };
  }
  if ("settings" in updatePayload) {
    rv.settings = { ...rv.settings, ...updatePayload.settings };
  }

  return rv;
};
