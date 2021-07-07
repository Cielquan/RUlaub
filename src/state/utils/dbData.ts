type Vacation = {
  id: number;
  startDate: string;
  startDay: number;
  endDate: string;
  endDay: number;
  typeId: number;
};

type UserConfig = {
  id: number;
  name: string;
  abbr: string;
  vacationDays: number;
  hexColor: number;
  groupManagerId: number;
  vacations: Vacation[];
};

type UserConfigPayload = {
  id?: number;
  name?: string;
  abbr?: string;
  vacationDays?: number;
  hexColor?: number;
  groupManagerId?: number;
  vacations?: Vacation[];
};

export type DBData = {
  users: UserConfig[];
};

export type DBDataPayload = {
  users?: UserConfigPayload[];
};

export const updateDBData = (
  currentData: DBData,
  updatePayload: DBDataPayload
): DBData => currentData;
