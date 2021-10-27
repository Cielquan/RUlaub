/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Schema for vacation types data coming from the backend
 */
export interface VacationTypesDataSchema {
  [k: string]: VacationTypeData;
}
/**
 * This interface was referenced by `VacationTypesDataSchema`'s JSON-Schema definition
 * via the `patternProperty` "^\d+$".
 */
export interface VacationTypeData {
  type: string;
  doCount: boolean;
  hexcolorDark: string;
  hexcolorLight: string;
  active: boolean;
}