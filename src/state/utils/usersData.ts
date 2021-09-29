import { UserData, UsersDataSchema } from "../../types/usersData.schema";

export type UsersData = UsersDataSchema;
export type UserDataPayload = [string, UserData];

export const updateUsersData = (
  currentData: UsersData,
  updatePayload: UserDataPayload
): UsersData => {
  const rv: UsersData = JSON.parse(JSON.stringify(currentData));
  const [id, updatedUserData] = updatePayload;
  rv[id] = updatedUserData;

  return rv;
};
