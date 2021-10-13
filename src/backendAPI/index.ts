import Ajv, { Schema } from "ajv";

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

export const writeErrorToLogFile = (error: Error): void => {
  console.error("ERROR IN LOGFILE: ", error);
};
