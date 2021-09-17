import {
  PublicHoliday,
  PublicHolidaysDataSchema,
} from "../../types/publicHolidaysData.schema";

export type PublicHolidaysData = PublicHolidaysDataSchema;

export type PublicHolidaysDataPayload = Partial<PublicHoliday>[];

export const updatePublicHolidaysData = (
  currentData: PublicHolidaysData,
  updatePayload: PublicHolidaysDataPayload
): PublicHolidaysData => currentData;
