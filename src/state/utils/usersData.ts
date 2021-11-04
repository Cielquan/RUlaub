import { UserData } from "../../backendAPI/types/usersData.schema";

export type UserDataPayload = [string, UserData];
export type NewUserData = Omit<UserData, "calc" | "vacations">;
export type NewUserDataPayload = [string, NewUserData];
