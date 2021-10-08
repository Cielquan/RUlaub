import { UserData, UsersDataSchema } from "../../backendAPI/types/usersData.schema";

export type UsersData = UsersDataSchema;
export type UserDataPayload = [string, UserData];

export const addUsersData = (
  currentData: UsersData,
  usersToAdd: UserData[]
): UsersData => {
  const rv: UsersData = JSON.parse(JSON.stringify(currentData));
  const highestID = Math.max(...Object.keys(currentData).map((id) => Number(id)));
  usersToAdd.forEach((user, idx) => {
    rv[highestID + idx + 1] = user;
  });
  return rv;
};

export const removeUsersData = (
  currentData: UsersData,
  userIDsToRemove: string[]
): UsersData => {
  const rv: UsersData = JSON.parse(JSON.stringify(currentData));
  userIDsToRemove.forEach((userID) => {
    delete rv[userID];
  });
  return rv;
};

export const updateUsersData = (
  currentData: UsersData,
  updatePayload: UserDataPayload[]
): UsersData => {
  const rv: UsersData = JSON.parse(JSON.stringify(currentData));
  updatePayload.forEach((userUpdate) => {
    const [id, updatedUserData] = userUpdate;
    rv[id] = updatedUserData;
  });
  return rv;
};
