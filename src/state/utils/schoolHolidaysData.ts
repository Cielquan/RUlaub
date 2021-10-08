import {
  SchoolHolidayData,
  SchoolHolidaysDataSchema,
} from "../../backendAPI/types/schoolHolidaysData.schema";

export type SchoolHolidaysData = SchoolHolidaysDataSchema;
export type SchoolHolidayDataPayload = [string, SchoolHolidayData];

export const updateSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  updatePayload: SchoolHolidayDataPayload
): SchoolHolidaysData => {
  const rv: SchoolHolidaysData = JSON.parse(JSON.stringify(currentData));
  const [id, updatedUserData] = updatePayload;
  rv[id] = updatedUserData;

  return rv;
};
