import Ajv from "ajv";
import ConfigFileSchema from "../schemas/configFile.schema.json";
import { ConfigFileSchema as ConfigFile } from "../types/configFile.schema";

import configDataJSON from "./dev_temp/test.local_config.json";

export const validateData = (data: unknown): Promise<ConfigFile> =>
  new Promise((resolve, reject) => {
    const ajv = new Ajv();
    const validate = ajv.compile<ConfigFile>(ConfigFileSchema);
    if (validate(data)) resolve(data);
    reject(validate.errors);
  });

export const load = (): Promise<ConfigFile> => validateData(configDataJSON);
// new Promise((resolve, reject) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const data = validateData(configDataJSON);

// if (data) resolve(data);
// reject(data);
// });
