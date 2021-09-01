import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import React from "react";
import renderer from "react-test-renderer";

import CalendarColumnLabelsMonthCell from "../CalendarColumnLabelsMonthCell";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

describe("<CalendarColumnLabelsMonthCell />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <I18nProvider i18n={i18n}>
          <CalendarColumnLabelsMonthCell
            index={1}
            style={{ height: 1, left: 2, top: 3, width: 4 }}
          />
        </I18nProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
