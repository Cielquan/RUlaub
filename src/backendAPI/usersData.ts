import Ajv from "ajv";
import UsersDataSchema from "./schemas/usersData.schema.json";
import { UsersDataSchema as UsersData } from "./types/usersData.schema";

import usersDataJSON from "./dev_temp/test.usersData.json";

export const validateData = (data: unknown): Promise<UsersData> =>
  new Promise((resolve, reject) => {
    const ajv = new Ajv();
    const validate = ajv.compile<UsersData>(UsersDataSchema);
    if (validate(data)) resolve(data);
    reject(validate.errors);
  });

export const load = (): Promise<UsersData> => validateData(usersDataJSON);
// new Promise((resolve, reject) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const data = validateData(usersDataJSON);

// if (data) resolve(data);
// reject(data);
// });
