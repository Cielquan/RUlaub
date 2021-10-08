/* eslint-disable import/prefer-default-export */
import Ajv, { Schema } from "ajv";

export const createDataValidater =
  <T>(schema: Schema) =>
  (data: unknown): Promise<T> =>
    new Promise((resolve, reject) => {
      const ajv = new Ajv();
      const validate = ajv.compile<T>(schema);
      if (validate(data)) resolve(data);
      reject(validate.errors);
    });
