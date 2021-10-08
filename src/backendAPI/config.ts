import { createDataValidator, writeErrorToLogFile } from ".";
import { DataFetchingError, DataValidationError } from "../errors";
import ConfigFileSchema from "./schemas/configFile.schema.json";
import { ConfigFileSchema as ConfigFile } from "./types/configFile.schema";

import configDataJSON from "./dev_temp/test.local_config.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(configDataJSON));

export const validateData = (data: unknown): Promise<ConfigFile> =>
  createDataValidator<ConfigFile>(ConfigFileSchema)(data);

export const load = async (): Promise<ConfigFile> => {
  let data;
  try {
    data = await fetchData();
  } catch (error) {
    writeErrorToLogFile(error as Error);
    return Promise.reject(new DataFetchingError((error as Error).toString()));
  }

  let validatedData;
  try {
    validatedData = await validateData(data);
  } catch (error) {
    writeErrorToLogFile(error as Error);
    return Promise.reject(new DataValidationError((error as Error).toString()));
  }

  return Promise.resolve(validatedData);
};
