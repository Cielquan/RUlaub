import { VacationDataSchema } from "../../types/vacationData.schema";

export type VacationData = VacationDataSchema;

// export type VacationDataPayload = Partial<UserData>[];
export type VacationDataPayload = VacationDataSchema;

export const updateVacationData = (
  currentData: VacationData,
  updatePayload: VacationDataPayload
): VacationData => updatePayload;
