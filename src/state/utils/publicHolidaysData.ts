import { PublicHolidayData } from "../../backendAPI/types/publicHolidaysData.schema";

export type PublicHolidayDataPayload = [string, PublicHolidayData];
export type NewPublicHolidayData = Omit<PublicHolidayData, "calc">;
export type NewPublicHolidayDataPayload = [string, NewPublicHolidayData];
