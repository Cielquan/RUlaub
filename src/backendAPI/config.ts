import { createDataValidater } from ".";
import ConfigFileSchema from "./schemas/configFile.schema.json";
import { ConfigFileSchema as ConfigFile } from "./types/configFile.schema";

import configDataJSON from "./dev_temp/test.local_config.json";

export const validateData = (data: unknown): Promise<ConfigFile> =>
  createDataValidater<ConfigFile>(ConfigFileSchema)(data);

export const load = (): Promise<ConfigFile> => validateData(configDataJSON);
