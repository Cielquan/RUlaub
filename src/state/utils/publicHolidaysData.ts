import {
  PublicHolidayData,
  PublicHolidaysDataSchema,
} from "../../backendAPI/types/publicHolidaysData.schema";

export type PublicHolidaysData = PublicHolidaysDataSchema;
export type PublicHolidayDataPayload = [string, PublicHolidayData];

export const addPublicHolidaysData = (
  currentData: PublicHolidaysData,
  dataToAdd: PublicHolidayData[]
): PublicHolidaysData => {
  const rv: PublicHolidaysData = JSON.parse(JSON.stringify(currentData));
  const highestID = Math.max(...Object.keys(currentData).map((id) => Number(id)));
  dataToAdd.forEach((user, idx) => {
    rv[highestID + idx + 1] = user;
  });
  return rv;
};

export const removePublicHolidaysData = (
  currentData: PublicHolidaysData,
  dataIDsToRemove: string[]
): PublicHolidaysData => {
  const rv: PublicHolidaysData = JSON.parse(JSON.stringify(currentData));
  dataIDsToRemove.forEach((userID) => {
    delete rv[userID];
  });
  return rv;
};

export const updatePublicHolidaysData = (
  currentData: PublicHolidaysData,
  updatePayload: PublicHolidayDataPayload[]
): PublicHolidaysData => {
  const rv: PublicHolidaysData = JSON.parse(JSON.stringify(currentData));
  updatePayload.forEach((userUpdate) => {
    const [id, updatedPublicHolidayData] = userUpdate;
    rv[id] = updatedPublicHolidayData;
  });
  return rv;
};
