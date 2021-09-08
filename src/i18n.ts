import { i18n } from "@lingui/core";
import { de, en } from "make-plural/plurals";

import { messages as deMessages } from "./locales/de-DE/messages";
import { messages as enMessages } from "./locales/en-US/messages";
import { defaultLocale } from "./state/utils/i18n";

i18n.loadLocaleData({
  "de-DE": { plurals: de },
  "en-US": { plurals: en },
});
i18n.load("de-DE", deMessages);
i18n.load("en-US", enMessages);
i18n.activate(defaultLocale);

export default i18n;
