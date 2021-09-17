import { UserData, VacationDataSchema } from "../../types/vacationData.schema";

export type VacationData = VacationDataSchema;

export type VacationDataPayload = Partial<UserData>[];

export const updateVacationData = (
  currentData: VacationData,
  updatePayload: VacationDataPayload
): VacationData => currentData;
