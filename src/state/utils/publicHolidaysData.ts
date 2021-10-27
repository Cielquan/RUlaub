import { updateData } from ".";
import {
  PublicHolidayData,
  PublicHolidaysDataSchema as PublicHolidaysData,
} from "../../backendAPI/types/publicHolidaysData.schema";

export type PublicHolidayDataPayload = [string, PublicHolidayData];
export type NewPublicHolidayData = Omit<PublicHolidayData, "calc">;
export type NewPublicHolidayDataPayload = [string, NewPublicHolidayData];

export const updatePublicHolidaysData = (
  currentData: PublicHolidaysData,
  updatePayload: PublicHolidayDataPayload[]
): PublicHolidaysData => updateData<PublicHolidayData>(currentData, updatePayload);
