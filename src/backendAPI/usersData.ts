import { createDataLoader, createDataValidator } from ".";
import UsersDataSchema from "./schemas/usersData.schema.json";
import { UsersDataSchema as UsersData } from "./types/usersData.schema";

import usersDataJSON from "./dev_temp/test.usersData.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(usersDataJSON));

export const validateData = (data: unknown): Promise<UsersData> =>
  createDataValidator<UsersData>(UsersDataSchema)(data);

export const load = (): Promise<UsersData> =>
  createDataLoader<UsersData>("Users", fetchData, validateData)();
