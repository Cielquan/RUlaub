import { PublicHolidayData } from "../../backendAPI/types/publicHolidaysData.schema";
import { SchoolHolidayData } from "../../backendAPI/types/schoolHolidaysData.schema";
import { UserData } from "../../backendAPI/types/usersData.schema";
import { VacationTypeData } from "../../backendAPI/types/vacationTypesData.schema";

export type PublicHolidayDataPayload = [string, PublicHolidayData];
export type NewPublicHolidayData = Omit<PublicHolidayData, "calc">;
export type NewPublicHolidayDataPayload = [string, NewPublicHolidayData];

export type SchoolHolidayDataPayload = [string, SchoolHolidayData];
export type NewSchoolHolidayData = Omit<SchoolHolidayData, "calc">;
export type NewSchoolHolidayDataPayload = [string, NewSchoolHolidayData];

export type UserDataPayload = [string, UserData];
export type NewUserData = Omit<UserData, "calc" | "vacations">;
export type NewUserDataPayload = [string, NewUserData];

export type VacationTypeDataPayload = [string, VacationTypeData];
export type NewVacationTypeData = VacationTypeData;
export type NewVacationTypeDataPayload = [string, NewVacationTypeData];
