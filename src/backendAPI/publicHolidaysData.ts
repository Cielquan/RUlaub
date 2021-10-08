import { createDataValidater } from ".";
import PublicHolidaysDataSchema from "./schemas/publicHolidaysData.schema.json";
// eslint-disable-next-line max-len
import { PublicHolidaysDataSchema as PublicHolidaysData } from "./types/publicHolidaysData.schema";

import publicHolidaysDataJSON from "./dev_temp/test.publicHolidaysData.json";

export const validateData = (data: unknown): Promise<PublicHolidaysData> =>
  createDataValidater<PublicHolidaysData>(PublicHolidaysDataSchema)(data);

export const load = (): Promise<PublicHolidaysData> =>
  validateData(publicHolidaysDataJSON);
