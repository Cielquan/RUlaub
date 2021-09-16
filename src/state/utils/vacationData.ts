interface Vacation {
  id: number;
  startDate: string;
  startYearDay: number;
  endDate: string;
  endYearDay: number;
  hexcolor: number;
}

interface VacationStat {
  type: string;
  count: number;
}

interface UserStats {
  availableVacationDays: number;
  takenVacationDays: number;
  vacationStats: VacationStat[];
}

interface UserData {
  id: number;
  name: string;
  userStats: UserStats;
  vacations: Vacation[];
}

export interface VacationData {
  users: UserData[];
}

export interface VacationDataPayload {
  users?: Partial<UserData>[];
}

export const updateVacationData = (
  currentData: VacationData,
  updatePayload: VacationDataPayload
): VacationData => currentData;
