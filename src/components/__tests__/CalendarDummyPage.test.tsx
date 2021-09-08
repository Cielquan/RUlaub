import { I18nProvider } from "@lingui/react";
import React from "react";
import renderer from "react-test-renderer";

import i18n from "../../i18n";

import CalendarDummyPage from "../CalendarDummyPage";

describe("<CalendarDummyPage />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <I18nProvider i18n={i18n}>
          <CalendarDummyPage />
        </I18nProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
