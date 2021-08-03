import { SupportedLocales } from "../../i18n";
import { SupportedThemes } from "../../theme";

export type UserConfig = {
  name: string;
  abbr: string;
  vacationDays: number;
  hexColor: number;
};

export type SettingsConfig = {
  databaseURI: string;
  yearToShow: number;
  theme: SupportedThemes;
  language: SupportedLocales;
};

export type LocalConfig = {
  user: UserConfig;
  settings: SettingsConfig;
};

export type LocalConfigPayload = {
  user?: Partial<UserConfig>;
  settings?: Partial<SettingsConfig>;
};

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
