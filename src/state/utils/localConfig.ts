type UserConfig = {
  name: string;
  abbr: string;
  vacationDays: number;
  hexColor: number;
};

type UserConfigPayload = {
  name?: string;
  abbr?: string;
  vacationDays?: number;
  hexColor?: number;
};

type SettingsConfig = {
  databaseURI: string;
  yearToShow: number;
  theme: string;
};

type SettingsConfigPayload = {
  databaseURI?: string;
  yearToShow?: number;
  theme?: string;
};

export type LocalConfig = {
  user: UserConfig;
  settings: SettingsConfig;
};

export type LocalConfigPayload = {
  user?: UserConfigPayload;
  settings?: SettingsConfigPayload;
};

export const updateLocalConfig = (
  currentConfig: LocalConfig,
  updatePayload: LocalConfigPayload
): LocalConfig => {
  const rv = currentConfig;

  if ("user" in updatePayload) {
    rv.user = { ...rv.user, ...updatePayload.user };
  }
  if ("settings" in updatePayload) {
    rv.settings = { ...rv.settings, ...updatePayload.settings };
  }

  return rv;
};
