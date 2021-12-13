import { createDataValidator } from ".";
import ConfigFileSchema from "./schemas/configFile.schema.json";
import { ConfigFileSchema as ConfigFile } from "./types/configFile.schema";

export const validateConfig = (data: unknown): Promise<ConfigFile> =>
  createDataValidator<ConfigFile>(ConfigFileSchema)(data);
