import {
  SchoolHolidayData,
  SchoolHolidaysDataSchema,
} from "../../types/schoolHolidaysData.schema";

export type SchoolHolidaysData = SchoolHolidaysDataSchema;
export type SchoolHolidayDataPayload = [number, SchoolHolidayData];

export const updateSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  updatePayload: SchoolHolidayDataPayload
): SchoolHolidaysData => {
  const rv: SchoolHolidaysData = JSON.parse(JSON.stringify(currentData));
  const [id, updatedUserData] = updatePayload;
  rv[id] = updatedUserData;

  return rv;
};
