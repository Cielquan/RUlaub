/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Schema for public holiday data coming from the backend
 */
export type PublicHolidaysDataSchema = PublicHoliday[];

export interface PublicHoliday {
  id: number;
  name: string;
  yearDay: number;
}