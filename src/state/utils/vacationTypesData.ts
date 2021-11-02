import { updateData } from ".";
import {
  VacationTypeData,
  VacationTypesDataSchema as VacationTypesData,
} from "../../backendAPI/types/vacationTypesData.schema";

export type VacationTypeDataPayload = [string, VacationTypeData];
export type NewVacationTypeData = VacationTypeData;
export type NewVacationTypeDataPayload = [string, NewVacationTypeData];

export const updateVacationTypesData = (
  currentData: VacationTypesData,
  updatePayload: VacationTypeDataPayload[]
): VacationTypesData => updateData<VacationTypeData>(currentData, updatePayload);
