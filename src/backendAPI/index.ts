import Ajv, { Schema } from "ajv";

import { DataFetchingError, DataValidationError } from "../errors";

export const logError = (error: Error): void => {
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
  <T>(
    target: string,
    fetchFn: () => Promise<unknown>,
    validateFn: (data: unknown) => Promise<T>
  ) =>
  async (): Promise<T> => {
    let data;
    try {
      data = await fetchFn();
    } catch (error) {
      logError(error as Error);
      return Promise.reject(new DataFetchingError(target, (error as Error).toString()));
    }

    let validatedData;
    try {
      validatedData = await validateFn(data);
    } catch (error) {
      logError(error as Error);
      return Promise.reject(
        new DataValidationError(target, (error as Error).toString())
      );
    }

    return Promise.resolve(validatedData);
  };
