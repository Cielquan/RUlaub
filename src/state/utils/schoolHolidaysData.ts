import {
  SchoolHolidayData,
  SchoolHolidaysDataSchema,
} from "../../backendAPI/types/schoolHolidaysData.schema";

export type SchoolHolidaysData = SchoolHolidaysDataSchema;
export type SchoolHolidayDataPayload = [string, SchoolHolidayData];

export const addSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  dataToAdd: SchoolHolidayData[]
): SchoolHolidaysData => {
  const rv: SchoolHolidaysData = JSON.parse(JSON.stringify(currentData));
  const highestID = Math.max(...Object.keys(currentData).map((id) => Number(id)));
  dataToAdd.forEach((user, idx) => {
    rv[highestID + idx + 1] = user;
  });
  return rv;
};

export const removeSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  dataIDsToRemove: string[]
): SchoolHolidaysData => {
  const rv: SchoolHolidaysData = JSON.parse(JSON.stringify(currentData));
  dataIDsToRemove.forEach((userID) => {
    delete rv[userID];
  });
  return rv;
};

export const updateSchoolHolidaysData = (
  currentData: SchoolHolidaysData,
  updatePayload: SchoolHolidayDataPayload[]
): SchoolHolidaysData => {
  const rv: SchoolHolidaysData = JSON.parse(JSON.stringify(currentData));
  updatePayload.forEach((userUpdate) => {
    const [id, updatedSchoolHolidayData] = userUpdate;
    rv[id] = updatedSchoolHolidayData;
  });
  return rv;
};
