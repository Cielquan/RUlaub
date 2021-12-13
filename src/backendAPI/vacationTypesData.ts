import { createDataLoader } from ".";
import { NewVacationTypeData, VacationTypeDataPayload } from "./types/helperTypes";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "./types/vacationTypesData.schema";
import { validateVacationTypesData } from "./validation";

import vacationTypesDataJSON from "./dev_temp/test.vacationTypesData.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(vacationTypesDataJSON));

export const load = (): Promise<VacationTypesData> =>
  createDataLoader<VacationTypesData>(
    "School Holidays",
    fetchData,
    validateVacationTypesData
  )();

export const add = (payload: NewVacationTypeData[]): Promise<VacationTypesData> =>
  load();

export const remove = (payload: string[]): Promise<VacationTypesData> => load();

export const update = (
  payload: VacationTypeDataPayload[]
): Promise<VacationTypesData> => load();
