import { createDataLoader, createDataValidator } from ".";
import UsersDataSchema from "./schemas/usersData.schema.json";
import {
  NewUserData,
  NewVacationData,
  UserDataPayload,
  VacationDataPayload,
} from "../state/utils/types";
import { UsersDataSchema as UsersData } from "./types/usersData.schema";

import usersDataJSON from "./dev_temp/test.usersData.json";

export const fetchData = (): Promise<unknown> =>
  new Promise((resolve) => resolve(usersDataJSON));

export const validateData = (data: unknown): Promise<UsersData> =>
  createDataValidator<UsersData>(UsersDataSchema)(data);

export const loadUsers = (): Promise<UsersData> =>
  createDataLoader<UsersData>("Users", fetchData, validateData)();

export const addUsers = (payload: NewUserData[]): Promise<UsersData> => loadUsers();

export const removeUsers = (payload: string[]): Promise<UsersData> => loadUsers();

export const updateUsers = (payload: UserDataPayload[]): Promise<UsersData> =>
  loadUsers();

export const addVacations = (payload: NewVacationData[]): Promise<UsersData> =>
  loadUsers();

export const removeVacations = (payload: string[]): Promise<UsersData> => loadUsers();

export const updateVacations = (payload: VacationDataPayload[]): Promise<UsersData> =>
  loadUsers();
