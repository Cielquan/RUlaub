import {
  SchoolHoliday,
  SchoolHolidaysDataSchema,
} from "../../types/schoolHolidaysData.schema";

export type SchoolHolidaysData = SchoolHolidaysDataSchema;

export type SchoolHolidaysDataPayload = Partial<SchoolHoliday>[];

export const updateSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  updatePayload: SchoolHolidaysDataPayload
): SchoolHolidaysData => currentData;
