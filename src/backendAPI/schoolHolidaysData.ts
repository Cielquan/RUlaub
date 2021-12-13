import { createDataLoader } from ".";
import { NewSchoolHolidayData, SchoolHolidayDataPayload } from "./types/helperTypes";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "./types/schoolHolidaysData.schema";
import { validateSchoolHolidaysData } from "./validation";

import schoolHolidaysDataJSON from "./dev_temp/test.schoolHolidaysData.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(schoolHolidaysDataJSON));

export const load = (): Promise<SchoolHolidaysData> =>
  createDataLoader<SchoolHolidaysData>(
    "School Holidays",
    fetchData,
    validateSchoolHolidaysData
  )();

export const add = (payload: NewSchoolHolidayData[]): Promise<SchoolHolidaysData> =>
  load();

export const remove = (payload: string[]): Promise<SchoolHolidaysData> => load();

export const update = (
  payload: SchoolHolidayDataPayload[]
): Promise<SchoolHolidaysData> => load();
