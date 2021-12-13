import { createDataLoader } from ".";
import { NewPublicHolidayData, PublicHolidayDataPayload } from "./types/helperTypes";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "./types/publicHolidaysData.schema";
import { validatePublicHolidaysData } from "./validation";

import publicHolidaysDataJSON from "./dev_temp/test.publicHolidaysData.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(publicHolidaysDataJSON));

export const load = (): Promise<PublicHolidaysData> =>
  createDataLoader<PublicHolidaysData>(
    "Public Holidays",
    fetchData,
    validatePublicHolidaysData
  )();

export const add = (payload: NewPublicHolidayData[]): Promise<PublicHolidaysData> =>
  load();

export const remove = (payload: string[]): Promise<PublicHolidaysData> => load();

export const update = (
  payload: PublicHolidayDataPayload[]
): Promise<PublicHolidaysData> => load();
