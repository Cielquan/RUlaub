import Ajv, { Schema } from "ajv";

import { DataFetchingError, DataValidationError } from "../errors";

export const writeErrorToLogFile = (error: Error): void => {
  console.error("ERROR IN LOGFILE: ", error);
};

export const createDataValidator =
  <T>(schema: Schema) =>
  (data: unknown): Promise<T> => {
    const ajv = new Ajv();
    const validate = ajv.compile<T>(schema);

    return new Promise((resolve, reject) => {
      if (validate(data)) resolve(data);
      reject(validate.errors);
    });
  };

export const createDataLoader =
  <T>(fetchFn: () => Promise<unknown>, validateFn: (data: unknown) => Promise<T>) =>
  async (): Promise<T> => {
    let data;
    try {
      data = await fetchFn();
    } catch (error) {
      writeErrorToLogFile(error as Error);
      return Promise.reject(new DataFetchingError((error as Error).toString()));
    }

    let validatedData;
    try {
      validatedData = await validateFn(data);
    } catch (error) {
      writeErrorToLogFile(error as Error);
      return Promise.reject(new DataValidationError((error as Error).toString()));
    }

    return Promise.resolve(validatedData);
  };
