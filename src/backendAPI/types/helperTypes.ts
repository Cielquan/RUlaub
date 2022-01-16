import {
  PublicHolidayData,
  PublicHolidaysDataSchema,
} from "./publicHolidaysData.schema";
import {
  SchoolHolidayData,
  SchoolHolidaysDataSchema,
} from "./schoolHolidaysData.schema";
import { UserData, UsersDataSchema } from "./usersData.schema";
import { VacationData } from "./vacationsData.schema";
import { VacationTypeData, VacationTypesDataSchema } from "./vacationTypesData.schema";

export type PublicHolidayDataPayload = [string, PublicHolidayData];
export type PublicHolidayDataMap = PublicHolidaysDataSchema;
export type NewPublicHolidayData = Omit<PublicHolidayData, "calc">;
export type NewPublicHolidayDataPayload = [string, NewPublicHolidayData];

export type SchoolHolidayDataPayload = [string, SchoolHolidayData];
export type SchoolHolidayDataMap = SchoolHolidaysDataSchema;
export type NewSchoolHolidayData = SchoolHolidayData;
export type NewSchoolHolidayDataPayload = [string, NewSchoolHolidayData];

export type UserDataPayload = [string, UserData];
export type UserDataMap = UsersDataSchema;
export type NewUserData = Omit<UserData, "calc">;
export type NewUserDataPayload = [string, NewUserData];

export type VacationDataPayload = [string, VacationData];
export type NewVacationData = VacationData;
export type NewVacationDataPayload = [string, NewVacationData];

export type VacationTypeDataPayload = [string, VacationTypeData];
export type VacationTypeDataMap = VacationTypesDataSchema;
export type NewVacationTypeData = VacationTypeData;
export type NewVacationTypeDataPayload = [string, NewVacationTypeData];
