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

export interface DBData {
  users: UserConfig[];
}

export interface DBDataPayload {
  users?: Partial<UserConfig>[];
}

export const updateDBData = (
  currentData: DBData,
  updatePayload: DBDataPayload
): DBData => currentData;
