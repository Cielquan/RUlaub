import { SchoolHolidayData } from "../../backendAPI/types/schoolHolidaysData.schema";

export type SchoolHolidayDataPayload = [string, SchoolHolidayData];
export type NewSchoolHolidayData = Omit<SchoolHolidayData, "calc">;
export type NewSchoolHolidayDataPayload = [string, NewSchoolHolidayData];
