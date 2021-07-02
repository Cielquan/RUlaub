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
