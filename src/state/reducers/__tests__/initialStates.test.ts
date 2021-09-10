import { defaultLanguage, defaultLocale } from "../initialStates";
import Languages from "../../utils/i18n";

test("default i18n locale is en-US", () => {
  expect(defaultLocale).toEqual("en-US");
});

test("default i18n language is correctly picked", () => {
  expect(defaultLanguage).toEqual(Languages.english);
});
