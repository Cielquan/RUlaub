interface Vacation {
  id: number;
  startDate: string;
  startDay: number;
  endDate: string;
  endDay: number;
  typeId: number;
}

interface UserConfig {
  id: number;
  name: string;
  abbr: string;
  vacationDays: number;
  hexColor: number;
  groupManagerId: number;
  vacations: Vacation[];
}

export interface VacationData {
  users: UserConfig[];
}

export interface VacationDataPayload {
  users?: Partial<UserConfig>[];
}

export const updateVacationData = (
  currentData: VacationData,
  updatePayload: VacationDataPayload
): VacationData => currentData;
