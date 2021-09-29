import {
  PublicHolidayData,
  PublicHolidaysDataSchema,
} from "../../types/publicHolidaysData.schema";

export type PublicHolidaysData = PublicHolidaysDataSchema;
export type PublicHolidayDataPayload = [number, PublicHolidayData];

export const updatePublicHolidaysData = (
  currentData: PublicHolidaysData,
  updatePayload: PublicHolidayDataPayload
): PublicHolidaysData => {
  const rv: PublicHolidaysData = JSON.parse(JSON.stringify(currentData));
  const [id, updatedUserData] = updatePayload;
  rv[id] = updatedUserData;

  return rv;
};
