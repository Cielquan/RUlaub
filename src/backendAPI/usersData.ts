import { createDataLoader, createDataValidator } from ".";
import UsersDataSchema from "./schemas/usersData.schema.json";
import { NewUserData, UserDataPayload } from "../state/utils/usersData";
import { UsersDataSchema as UsersData } from "./types/usersData.schema";

import usersDataJSON from "./dev_temp/test.usersData.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(usersDataJSON));

export const validateData = (data: unknown): Promise<UsersData> =>
  createDataValidator<UsersData>(UsersDataSchema)(data);

export const load = (): Promise<UsersData> =>
  createDataLoader<UsersData>("Users", fetchData, validateData)();

export const add = (payload: NewUserData[]): Promise<UsersData> => load();

export const remove = (payload: string[]): Promise<UsersData> => load();

export const update = (payload: UserDataPayload[]): Promise<UsersData> => load();
