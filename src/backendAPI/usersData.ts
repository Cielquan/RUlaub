import { createDataLoader } from ".";
import {
  NewUserData,
  NewVacationData,
  UserDataPayload,
  VacationDataPayload,
} from "./types/helperTypes";
import { UsersDataSchema as UsersData } from "./types/usersData.schema";
import { validateUsersData } from "./validation";

import usersDataJSON from "./dev_temp/test.usersData.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(usersDataJSON));
export const loadUsers = (): Promise<UsersData> =>
  createDataLoader<UsersData>("Users", fetchData, validateUsersData)();

export const addUsers = (payload: NewUserData[]): Promise<UsersData> => loadUsers();

export const removeUsers = (payload: string[]): Promise<UsersData> => loadUsers();

export const updateUsers = (payload: UserDataPayload[]): Promise<UsersData> =>
  loadUsers();

export const addVacations = (payload: NewVacationData[]): Promise<UsersData> =>
  loadUsers();

export const removeVacations = (payload: string[]): Promise<UsersData> => loadUsers();

export const updateVacations = (payload: VacationDataPayload[]): Promise<UsersData> =>
  loadUsers();
