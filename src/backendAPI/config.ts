import { createDataLoader, createDataValidator } from ".";
import ConfigFileSchema from "./schemas/configFile.schema.json";
import { ConfigFileSchema as ConfigFile } from "./types/configFile.schema";

import configDataJSON from "./dev_temp/test.local_config.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(configDataJSON));

export const validateData = (data: unknown): Promise<ConfigFile> =>
  createDataValidator<ConfigFile>(ConfigFileSchema)(data);

export const load = (): Promise<ConfigFile> =>
  createDataLoader<ConfigFile>("Config", fetchData, validateData)();
