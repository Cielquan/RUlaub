import { createDataLoader, createDataValidator } from ".";
import SchoolHolidaysDataSchema from "./schemas/schoolHolidaysData.schema.json";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "./types/schoolHolidaysData.schema";

import schoolHolidaysDataJSON from "./dev_temp/test.schoolHolidaysData.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(schoolHolidaysDataJSON));

export const validateData = (data: unknown): Promise<SchoolHolidaysData> =>
  createDataValidator<SchoolHolidaysData>(SchoolHolidaysDataSchema)(data);

export const load = (): Promise<SchoolHolidaysData> =>
  createDataLoader<SchoolHolidaysData>("School Holidays", fetchData, validateData)();
