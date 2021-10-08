import Ajv from "ajv";
import PublicHolidaysDataSchema from "../schemas/publicHolidaysData.schema.json";
import { PublicHolidaysData } from "../state/utils/publicHolidaysData";

import publicHolidaysDataJSON from "./dev_temp/test.publicHolidaysData.json";

export const validateData = (data: unknown): Promise<PublicHolidaysData> =>
  new Promise((resolve, reject) => {
    const ajv = new Ajv();
    const validate = ajv.compile<PublicHolidaysData>(PublicHolidaysDataSchema);
    if (validate(data)) resolve(data);
    reject(validate.errors);
  });

export const load = (): Promise<PublicHolidaysData> =>
  validateData(publicHolidaysDataJSON);
// new Promise((resolve, reject) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const data = validateData(publicHolidaysDataJSON);

// if (data) resolve(data);
// reject(data);
// });
