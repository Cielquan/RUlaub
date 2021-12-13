import { createDataLoader, createDataValidator } from ".";
import VacationTypesDataSchema from "./schemas/vacationTypesData.schema.json";
import { NewVacationTypeData, VacationTypeDataPayload } from "./types/helperTypes";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "./types/vacationTypesData.schema";

import vacationTypesDataJSON from "./dev_temp/test.vacationTypesData.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(vacationTypesDataJSON));

export const validateData = (data: unknown): Promise<VacationTypesData> =>
  createDataValidator<VacationTypesData>(VacationTypesDataSchema)(data);

export const load = (): Promise<VacationTypesData> =>
  createDataLoader<VacationTypesData>("School Holidays", fetchData, validateData)();

export const add = (payload: NewVacationTypeData[]): Promise<VacationTypesData> =>
  load();

export const remove = (payload: string[]): Promise<VacationTypesData> => load();

export const update = (
  payload: VacationTypeDataPayload[]
): Promise<VacationTypesData> => load();
