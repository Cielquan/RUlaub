import { addData, removeData, updateData } from ".";
import {
  SchoolHolidayData,
  SchoolHolidaysDataSchema as SchoolHolidaysData,
} from "../../backendAPI/types/schoolHolidaysData.schema";

export type SchoolHolidayDataPayload = [string, SchoolHolidayData];

export const addSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  dataToAdd: SchoolHolidayData[]
): SchoolHolidaysData => addData<SchoolHolidayData>(currentData, dataToAdd);

export const removeSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  dataIDsToRemove: string[]
): SchoolHolidaysData => removeData<SchoolHolidayData>(currentData, dataIDsToRemove);

export const updateSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  updatePayload: SchoolHolidayDataPayload[]
): SchoolHolidaysData => updateData<SchoolHolidayData>(currentData, updatePayload);
