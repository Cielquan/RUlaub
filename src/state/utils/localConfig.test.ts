import {
  LocalConfig,
  LocalConfigPayload,
  SettingsConfigPayload,
  updateLocalConfig,
} from "./localConfig";

describe("updateLocalConfig", () => {
  let orig: LocalConfig;

  beforeEach(() => {
    orig = {
      user: { name: "test", abbr: "t", vacationDays: 1, hexColor: 1 },
      settings: {
        databaseURI: "URL",
        yearToShow: 2021,
        theme: "dark",
        language: "en-US",
      },
    };
  });

  it("does not change with 'nothing' given", () => {
    const toAdd: LocalConfigPayload = {};
    const result = updateLocalConfig(orig, toAdd);

    expect(result).toEqual(orig);
  });

  it("updates single 'user' data point correctly (name)", () => {
    const changedValue = "changed";
    const toAdd: LocalConfigPayload = { user: { name: changedValue } };
    const result = updateLocalConfig(orig, toAdd);

    expect(result.user.name).toBe(changedValue);
    expect(result.user.abbr).toBe(orig.user.abbr);
    expect(result.user.vacationDays).toBe(orig.user.vacationDays);
    expect(result.user.hexColor).toBe(orig.user.hexColor);
    expect(result.settings).toEqual(orig.settings);
  });

  it("updates whole 'user' data correctly", () => {
    const changedValue = { name: "changed", abbr: "c", vacationDays: 2, hexColor: 2 };
    const toAdd: LocalConfigPayload = { user: changedValue };
    const result = updateLocalConfig(orig, toAdd);

    expect(result.user).toEqual(changedValue);
    expect(result.settings).toEqual(orig.settings);
  });

  it("updates single 'settings' data point correctly (theme)", () => {
    const changedValue = "light";
    const toAdd: LocalConfigPayload = { settings: { theme: changedValue } };
    const result = updateLocalConfig(orig, toAdd);

    expect(orig.settings.theme).not.toBe(changedValue);
    expect(result.settings.theme).toBe(changedValue);
    expect(result.settings.databaseURI).toBe(orig.settings.databaseURI);
    expect(result.settings.yearToShow).toBe(orig.settings.yearToShow);
    expect(result.settings.language).toBe(orig.settings.language);
    expect(result.user).toEqual(orig.user);
  });

  it("updates whole 'settings' data correctly", () => {
    const changedValue: SettingsConfigPayload = {
      databaseURI: "changed",
      yearToShow: 1919,
      theme: "light",
      language: "de-DE",
    };
    const toAdd: LocalConfigPayload = { settings: changedValue };
    const result = updateLocalConfig(orig, toAdd);

    expect(result.settings).toEqual(changedValue);
    expect(result.user).toEqual(orig.user);
  });
});
