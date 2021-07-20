import {
  datePlusDays,
  getDaysForDate,
  getDaysInMonth,
  isLeapYear,
  sameDay,
} from "./dateutils";

describe("isLeapYear", () => {
  it("is 'true' when divisable by 4 and not 100", () => {
    const result = isLeapYear(2004);

    expect(result).toBe(true);
  });

  it("is 'true' when divisable by 400", () => {
    const result = isLeapYear(2000);

    expect(result).toBe(true);
  });

  it("is 'false' when neither divisable by 4 nor 400", () => {
    const result = isLeapYear(2001);

    expect(result).toBe(false);
  });
});

describe("datePlusDays", () => {
  it("is correct when adding 0 days", () => {
    const result = datePlusDays(new Date("2020-01-01"), 0);

    expect(result).toEqual(new Date("2020-01-01"));
  });

  it("is correct when adding 1 day in month", () => {
    const result = datePlusDays(new Date("2020-01-01"), 1);

    expect(result).toEqual(new Date("2020-01-02"));
  });

  it("is correct when adding -1 day in month", () => {
    const result = datePlusDays(new Date("2020-01-02"), -1);

    expect(result).toEqual(new Date("2020-01-01"));
  });

  it("is correct when adding 1 day at month end", () => {
    const result = datePlusDays(new Date("2020-01-31"), 1);

    expect(result).toEqual(new Date("2020-02-01"));
  });

  it("is correct when adding -1 day at month start", () => {
    const result = datePlusDays(new Date("2020-02-01"), -1);

    expect(result).toEqual(new Date("2020-01-31"));
  });

  it("is correct when adding 365 days at year start", () => {
    const result = datePlusDays(new Date("2019-01-01"), 365);

    expect(result).toEqual(new Date("2020-01-01"));
  });

  it("is correct when adding -365 days at year start", () => {
    const result = datePlusDays(new Date("2020-01-01"), -365);

    expect(result).toEqual(new Date("2019-01-01"));
  });
});

describe("getDaysInMonth", () => {
  it("is correct when july", () => {
    const result = getDaysInMonth(7, 2019);

    expect(result).toEqual(31);
  });

  it("is correct when non leap february", () => {
    const result = getDaysInMonth(2, 2019);

    expect(result).toEqual(28);
  });

  it("is correct when leap february", () => {
    const result = getDaysInMonth(2, 2020);

    expect(result).toEqual(29);
  });
});

describe("getDaysForDate", () => {
  it("is correct for 1.7. in leap year", () => {
    const result = getDaysForDate(new Date("2020-07-01"));

    expect(result).toEqual(183);
  });

  it("is correct for 1.7. in non leap year", () => {
    const result = getDaysForDate(new Date("2019-07-01"));

    expect(result).toEqual(182);
  });
});

describe("sameDay", () => {
  it("is 'true' for same dates", () => {
    const result = sameDay(new Date("2020-01-01"), new Date("2020-01-01"));

    expect(result).toBe(true);
  });

  it("is 'false' for different day in same month", () => {
    const result = sameDay(new Date("2020-01-01"), new Date("2020-01-02"));

    expect(result).toBe(false);
  });

  it("is 'false' for same day in other month", () => {
    const result = sameDay(new Date("2020-01-01"), new Date("2020-02-01"));

    expect(result).toBe(false);
  });

  it("is 'false' for same day in other year", () => {
    const result = sameDay(new Date("2020-01-01"), new Date("2019-01-01"));

    expect(result).toBe(false);
  });

  it("is 'false' for different day and month in same year", () => {
    const result = sameDay(new Date("2020-01-01"), new Date("2020-02-02"));

    expect(result).toBe(false);
  });

  it("is 'false' for different month and year", () => {
    const result = sameDay(new Date("2020-01-01"), new Date("2019-02-01"));

    expect(result).toBe(false);
  });

  it("is 'false' for different day and year", () => {
    const result = sameDay(new Date("2020-01-01"), new Date("2019-01-02"));

    expect(result).toBe(false);
  });

  it("is 'false' for different dates", () => {
    const result = sameDay(new Date("2020-01-01"), new Date("2019-12-31"));

    expect(result).toBe(false);
  });
});
