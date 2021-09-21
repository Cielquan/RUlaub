import { PublicHolidaysDataSchema } from "../../types/publicHolidaysData.schema";

export type PublicHolidaysData = PublicHolidaysDataSchema;

// export type PublicHolidaysDataPayload = Partial<PublicHoliday>[];
export type PublicHolidaysDataPayload = PublicHolidaysDataSchema;

export const updatePublicHolidaysData = (
  currentData: PublicHolidaysData,
  updatePayload: PublicHolidaysDataPayload
): PublicHolidaysData => updatePayload;
