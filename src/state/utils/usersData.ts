import { updateData } from ".";
import {
  UserData,
  UsersDataSchema as UsersData,
} from "../../backendAPI/types/usersData.schema";

export type UserDataPayload = [string, UserData];
export type NewUserData = Omit<UserData, "calc" | "vacations">;
export type NewUserDataPayload = [string, NewUserData];

export const updateUsersData = (
  currentData: UsersData,
  updatePayload: UserDataPayload[]
): UsersData => updateData<UserData>(currentData, updatePayload);
