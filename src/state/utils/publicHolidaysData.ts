import { addData, removeData, updateData } from ".";
import {
  PublicHolidayData,
  PublicHolidaysDataSchema,
} from "../../backendAPI/types/publicHolidaysData.schema";

export type PublicHolidaysData = PublicHolidaysDataSchema;
export type PublicHolidayDataPayload = [string, PublicHolidayData];

export const addPublicHolidaysData = (
  currentData: PublicHolidaysData,
  dataToAdd: PublicHolidayData[]
): PublicHolidaysData => addData<PublicHolidayData>(currentData, dataToAdd);

export const removePublicHolidaysData = (
  currentData: PublicHolidaysData,
  dataIDsToRemove: string[]
): PublicHolidaysData => removeData<PublicHolidayData>(currentData, dataIDsToRemove);

export const updatePublicHolidaysData = (
  currentData: PublicHolidaysData,
  updatePayload: PublicHolidayDataPayload[]
): PublicHolidaysData => updateData<PublicHolidayData>(currentData, updatePayload);
