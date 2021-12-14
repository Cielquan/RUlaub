import { PublicHolidayData } from "./publicHolidaysData.schema";
import { SchoolHolidayData } from "./schoolHolidaysData.schema";
import { UserData } from "./usersData.schema";
import { VacationData } from "./vacationsData.schema";
import { VacationTypeData } from "./vacationTypesData.schema";

export type PublicHolidayDataPayload = [string, PublicHolidayData];
export type NewPublicHolidayData = Omit<PublicHolidayData, "calc">;
export type NewPublicHolidayDataPayload = [string, NewPublicHolidayData];

export type SchoolHolidayDataPayload = [string, SchoolHolidayData];
export type NewSchoolHolidayData = SchoolHolidayData;
export type NewSchoolHolidayDataPayload = [string, NewSchoolHolidayData];

export type UserDataPayload = [string, UserData];
export type NewUserData = Omit<UserData, "calc" | "vacations">;
export type NewUserDataPayload = [string, NewUserData];

export type VacationDataPayload = [string, VacationData];
export type NewVacationData = VacationData;
export type NewVacationDataPayload = [string, NewVacationData];

export type VacationTypeDataPayload = [string, VacationTypeData];
export type NewVacationTypeData = VacationTypeData;
export type NewVacationTypeDataPayload = [string, NewVacationTypeData];
