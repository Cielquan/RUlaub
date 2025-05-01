import { PublicHolidayData } from "./publicHolidaysData.schema";
import { SchoolHolidayData } from "./schoolHolidaysData.schema";
import { UserData } from "./usersData.schema";
import { VacationTypeData } from "./vacationTypesData.schema";
import { VacationData } from "./vacationsData.schema";

export type PublicHolidayDataPayload = [string, PublicHolidayData];
export interface PublicHolidayDataMap {
  [k: number]: PublicHolidayData;
}
export type NewPublicHolidayData = Omit<PublicHolidayData, "calc">;
export type NewPublicHolidayDataPayload = [string, NewPublicHolidayData];

export type SchoolHolidayDataPayload = [string, SchoolHolidayData];
export interface SchoolHolidayDataMap {
  [k: number]: SchoolHolidayData;
}
export type NewSchoolHolidayData = SchoolHolidayData;
export type NewSchoolHolidayDataPayload = [string, NewSchoolHolidayData];

export type UserDataPayload = [string, UserData];
export interface UserDataMap {
  [k: number]: UserData;
}
export type NewUserData = Omit<UserData, "calc">;
export type NewUserDataPayload = [string, NewUserData];

export type VacationDataPayload = [string, VacationData];
export interface VacationDataMap {
  [k: number]: VacationData;
}
export type NewVacationData = VacationData;
export type NewVacationDataPayload = [string, NewVacationData];

export type VacationTypeDataPayload = [string, VacationTypeData];
export interface VacationTypeDataMap {
  [k: number]: VacationTypeData;
}
export type NewVacationTypeData = VacationTypeData;
export type NewVacationTypeDataPayload = [string, NewVacationTypeData];
