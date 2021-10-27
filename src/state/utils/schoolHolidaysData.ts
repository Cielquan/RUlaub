import { updateData } from ".";
import {
  SchoolHolidayData,
  SchoolHolidaysDataSchema as SchoolHolidaysData,
} from "../../backendAPI/types/schoolHolidaysData.schema";

export type SchoolHolidayDataPayload = [string, SchoolHolidayData];
export type NewSchoolHolidayData = Omit<SchoolHolidayData, "calc">;
export type NewSchoolHolidayDataPayload = [string, NewSchoolHolidayData];

export const updateSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  updatePayload: SchoolHolidayDataPayload[]
): SchoolHolidaysData => updateData<SchoolHolidayData>(currentData, updatePayload);
