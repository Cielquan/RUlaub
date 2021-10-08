/* eslint-disable import/prefer-default-export */
import Ajv, { Schema } from "ajv";

export const createDataValidater =
  <T>(schema: Schema) =>
  (data: unknown): Promise<T> => {
    const ajv = new Ajv();
    const validate = ajv.compile<T>(schema);

    return new Promise((resolve, reject) => {
      if (validate(data)) resolve(data);
      reject(validate.errors);
    });
  };
