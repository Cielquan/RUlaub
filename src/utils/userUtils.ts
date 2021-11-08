/* eslint-disable import/prefer-default-export */
import { UsersDataSchema as UsersData } from "../backendAPI/types/usersData.schema";

export const getUserIdByName = (
  usersDataState: UsersData,
  currentUserName: string
): string | null => {
  const currentUser = Object.keys(usersDataState).filter(
    (userID) => usersDataState[userID].name === currentUserName
  );
  if (currentUser.length === 1) return currentUser[0];
  return null;
};
