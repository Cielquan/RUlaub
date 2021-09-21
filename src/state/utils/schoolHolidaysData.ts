import { SchoolHolidaysDataSchema } from "../../types/schoolHolidaysData.schema";

export type SchoolHolidaysData = SchoolHolidaysDataSchema;

// export type SchoolHolidaysDataPayload = Partial<SchoolHoliday>[];
export type SchoolHolidaysDataPayload = SchoolHolidaysDataSchema;

export const updateSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  updatePayload: SchoolHolidaysDataPayload
): SchoolHolidaysData => updatePayload;
