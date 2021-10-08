import Ajv from "ajv";
import SchoolHolidaysDataSchema from "../schemas/schoolHolidaysData.schema.json";
import { SchoolHolidaysData } from "../state/utils/schoolHolidaysData";

import schoolHolidaysDataJSON from "./dev_temp/test.schoolHolidaysData.json";

export const validateData = (data: unknown): Promise<SchoolHolidaysData> =>
  new Promise((resolve, reject) => {
    const ajv = new Ajv();
    const validate = ajv.compile<SchoolHolidaysData>(SchoolHolidaysDataSchema);
    if (validate(data)) resolve(data);
    reject(validate.errors);
  });

export const load = (): Promise<SchoolHolidaysData> =>
  validateData(schoolHolidaysDataJSON);
// new Promise((resolve, reject) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const data = validateData(schoolHolidaysDataJSON);

// if (data) resolve(data);
// reject(data);
// });
