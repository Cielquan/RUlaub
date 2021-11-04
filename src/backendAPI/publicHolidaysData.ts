import { createDataLoader, createDataValidator } from ".";
import PublicHolidaysDataSchema from "./schemas/publicHolidaysData.schema.json";
import {
  NewPublicHolidayData,
  PublicHolidayDataPayload,
} from "../state/utils/publicHolidaysData";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "./types/publicHolidaysData.schema";

import publicHolidaysDataJSON from "./dev_temp/test.publicHolidaysData.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(publicHolidaysDataJSON));

export const validateData = (data: unknown): Promise<PublicHolidaysData> =>
  createDataValidator<PublicHolidaysData>(PublicHolidaysDataSchema)(data);

export const load = (): Promise<PublicHolidaysData> =>
  createDataLoader<PublicHolidaysData>("Public Holidays", fetchData, validateData)();

export const add = (payload: NewPublicHolidayData[]): Promise<PublicHolidaysData> =>
  load();

export const remove = (payload: string[]): Promise<PublicHolidaysData> => load();

export const update = (
  payload: PublicHolidayDataPayload[]
): Promise<PublicHolidaysData> => load();
