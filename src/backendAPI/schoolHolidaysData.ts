import { createDataValidater } from ".";
import SchoolHolidaysDataSchema from "./schemas/schoolHolidaysData.schema.json";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "./types/schoolHolidaysData.schema";

import schoolHolidaysDataJSON from "./dev_temp/test.schoolHolidaysData.json";

export const validateData = (data: unknown): Promise<SchoolHolidaysData> =>
  createDataValidater<SchoolHolidaysData>(SchoolHolidaysDataSchema)(data);

export const load = (): Promise<SchoolHolidaysData> =>
  validateData(schoolHolidaysDataJSON);
