import Ajv, { Schema } from "ajv";

import ConfigFileSchema from "./schemas/configFile.schema.json";
import PublicHolidaysDataSchema from "./schemas/publicHolidaysData.schema.json";
import SchoolHolidaysDataSchema from "./schemas/schoolHolidaysData.schema.json";
import UsersDataSchema from "./schemas/usersData.schema.json";
import VacationTypesDataSchema from "./schemas/vacationTypesData.schema.json";
import { ConfigFileSchema as ConfigFile } from "./types/configFile.schema";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "./types/publicHolidaysData.schema";
// eslint-disable-next-line max-len
import { SchoolHolidaysDataSchema as SchoolHolidaysData } from "./types/schoolHolidaysData.schema";
import { UsersDataSchema as UsersData } from "./types/usersData.schema";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "./types/vacationTypesData.schema";

export const createDataValidator =
  <T>(schema: Schema) =>
  (data: unknown): Promise<T> => {
    const ajv = new Ajv();
    const validate = ajv.compile<T>(schema);

    return new Promise((resolve, reject) => {
      if (validate(data)) resolve(data);
      reject(validate.errors);
    });
  };

export const validateConfig = (data: unknown): Promise<ConfigFile> =>
  createDataValidator<ConfigFile>(ConfigFileSchema)(data);

export const validatePublicHolidaysData = (
  data: unknown
): Promise<PublicHolidaysData> =>
  createDataValidator<PublicHolidaysData>(PublicHolidaysDataSchema)(data);

export const validateSchoolHolidaysData = (
  data: unknown
): Promise<SchoolHolidaysData> =>
  createDataValidator<SchoolHolidaysData>(SchoolHolidaysDataSchema)(data);

export const validateUsersData = (data: unknown): Promise<UsersData> =>
  createDataValidator<UsersData>(UsersDataSchema)(data);

export const validateVacationTypesData = (data: unknown): Promise<VacationTypesData> =>
  createDataValidator<VacationTypesData>(VacationTypesDataSchema)(data);
