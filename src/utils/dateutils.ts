export const isLeapYear = (year: number): boolean => {
  const leapDayDate = new Date(year, 1, 29);
  const dayAfter = new Date(year, 2, 1);
  if (leapDayDate.toISOString() === dayAfter.toISOString()) {
    return false;
  }
  return true;
};

export const datePlusDays = (currentDate: Date, daysToAdd: number): Date => {
  const newDate = new Date(currentDate);
  newDate.setDate(currentDate.getDate() + daysToAdd);
  return newDate;
};

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

export const sameDay = (date1: Date, date2: Date): boolean =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();
