import { addData, removeData, updateData } from ".";
import { UserData, UsersDataSchema } from "../../backendAPI/types/usersData.schema";

export type UsersData = UsersDataSchema;
export type UserDataPayload = [string, UserData];

export const addUsersData = (
  currentData: UsersData,
  dataToAdd: UserData[]
): UsersData => addData<UserData>(currentData, dataToAdd);

export const removeUsersData = (
  currentData: UsersData,
  dataIDsToRemove: string[]
): UsersData => removeData<UserData>(currentData, dataIDsToRemove);

export const updateUsersData = (
  currentData: UsersData,
  updatePayload: UserDataPayload[]
): UsersData => updateData<UserData>(currentData, updatePayload);
