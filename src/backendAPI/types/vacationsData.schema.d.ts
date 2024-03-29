/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type ISODate = string;

/**
 * Schema for vacations data coming from the backend
 */
export interface VacationsDataSchema {
  /**
   * This interface was referenced by `VacationsDataSchema`'s JSON-Schema definition
   * via the `patternProperty` "^\d+$".
   */
  [k: string]: {
    [k: string]: VacationData;
  };
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^\d+$".
 */
export interface VacationData {
  typeId: number;
  start: DateData;
  end: DateData;
}
export interface DateData {
  date: ISODate;
  yearDay: number;
  year: number;
}
