import { UsersDataSchema } from "../../types/usersData.schema";

export type UsersData = UsersDataSchema;

export type UsersDataPayload = UsersDataSchema;

export const updateUsersData = (
  currentData: UsersData,
  updatePayload: UsersDataPayload
): UsersData => updatePayload;
