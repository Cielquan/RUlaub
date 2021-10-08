import { t } from "@lingui/macro";

import { Workdays } from "../backendAPI/types/usersData.schema";

export const isLeapYear = (year: number): boolean => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
};

export const datePlusDays = (currentDate: Date, daysToAdd: number): Date => {
  const newDate = new Date(currentDate);
  newDate.setDate(currentDate.getDate() + daysToAdd);
  return newDate;
};

export const getMonthNameList = (): string[] => [
  t`January`,
  t`February`,
  t`March`,
  t`April`,
  t`May`,
  t`June`,
  t`July`,
  t`August`,
  t`September`,
  t`October`,
  t`November`,
  t`December`,
];

export const getWeekdayNameList = (): string[] => [
  t`Monday`,
  t`Tuesday`,
  t`Wednesday`,
  t`Thursday`,
  t`Friday`,
  t`Saturday`,
  t`Sunday`,
];

type workdayKey = keyof Workdays;
export const getWeekdayKeyList = (): workdayKey[] => [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const getWeekdayNameDict = (): { [key in keyof Workdays]: string } => ({
  monday: t`Monday`,
  tuesday: t`Tuesday`,
  wednesday: t`Wednesday`,
  thursday: t`Thursday`,
  friday: t`Friday`,
  saturday: t`Saturday`,
  sunday: t`Sunday`,
});

const DaysInMonth: { [key: number]: number } = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

export const getDaysInMonth = (month: number, year: number): number => {
  let days = DaysInMonth[month];
  if (month === 2 && isLeapYear(year)) {
    days += 1;
  }
  return days;
};

const DaysTillMonth: { [key: number]: number } = {
  1: 0,
  2: 31,
  3: 59,
  4: 90,
  5: 120,
  6: 151,
  7: 181,
  8: 212,
  9: 243,
  10: 273,
  11: 304,
  12: 334,
};

export const getDaysForDate = (date: Date): number => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let days = DaysTillMonth[month] + day;

  if (month >= 2 && isLeapYear(year)) {
    days += 1;
  }
  return days;
};

export const sameDay = (date1: Date, date2: Date): boolean =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();
