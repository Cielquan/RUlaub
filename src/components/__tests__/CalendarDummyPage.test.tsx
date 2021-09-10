import { I18nProvider } from "@lingui/react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import i18n from "../../i18n";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

import CalendarDummyPage from "../CalendarDummyPage";

describe("<CalendarDummyPage />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <I18nProvider i18n={i18n}>
              <CalendarDummyPage />
            </I18nProvider>
          </LocalizationProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
