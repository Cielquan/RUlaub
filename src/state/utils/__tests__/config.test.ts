import { Config, ConfigPayload, SettingsConfig, updateConfig } from "../config";

describe("updateLocalConfig", () => {
  let orig: Config;

  beforeEach(() => {
    orig = {
      user: { name: "test" },
      settings: {
        databaseURI: "URL",
        yearToShow: 2021,
        theme: "dark",
        language: "en-US",
      },
    };
  });

  it("does not change with 'nothing' given", () => {
    const toAdd: ConfigPayload = {};
    const result = updateConfig(orig, toAdd);

    expect(result).toEqual(orig);
  });

  it("updates single 'user' data point correctly (name)", () => {
    const changedValue = "changed";
    const toAdd: ConfigPayload = { user: { name: changedValue } };
    const result = updateConfig(orig, toAdd);

    expect(result.user.name).toBe(changedValue);
    expect(result.settings).toEqual(orig.settings);
  });

  it("updates whole 'user' data correctly", () => {
    const changedValue = { name: "changed", abbr: "c", vacationDays: 2, hexColor: 2 };
    const toAdd: ConfigPayload = { user: changedValue };
    const result = updateConfig(orig, toAdd);

    expect(result.user).toEqual(changedValue);
    expect(result.settings).toEqual(orig.settings);
  });

  it("updates single 'settings' data point correctly (theme)", () => {
    const changedValue = "light";
    const toAdd: ConfigPayload = { settings: { theme: changedValue } };
    const result = updateConfig(orig, toAdd);

    expect(orig.settings.theme).not.toBe(changedValue);
    expect(result.settings.theme).toBe(changedValue);
    expect(result.settings.databaseURI).toBe(orig.settings.databaseURI);
    expect(result.settings.yearToShow).toBe(orig.settings.yearToShow);
    expect(result.settings.language).toBe(orig.settings.language);
    expect(result.user).toEqual(orig.user);
  });

  it("updates whole 'settings' data correctly", () => {
    const changedValue: Partial<SettingsConfig> = {
      databaseURI: "changed",
      yearToShow: 1919,
      theme: "light",
      language: "de-DE",
    };
    const toAdd: ConfigPayload = { settings: changedValue };
    const result = updateConfig(orig, toAdd);

    expect(result.settings).toEqual(changedValue);
    expect(result.user).toEqual(orig.user);
  });
});
