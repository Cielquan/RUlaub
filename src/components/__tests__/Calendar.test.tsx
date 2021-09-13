import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { CombinedState } from "redux";
import { MockStoreEnhanced } from "redux-mock-store";

import { initialState, State } from "../../state";
import generateMockStore from "../../testUtils";

import Calendar from "../Calendar";

jest.mock("../CalendarBody", () => () => "CalendarBody");
jest.mock("../CalendarColumnLabelsDay", () => () => "CalendarColumnLabelsDay");
jest.mock("../CalendarColumnLabelsMonth", () => () => "CalendarColumnLabelsMonth");
jest.mock("../CalendarStartPage", () => () => "CalendarStartPage");
jest.mock("../CalendarRowLabelsUser", () => () => "CalendarRowLabelsUser");
jest.mock("../CalendarTableHead", () => () => "CalendarTableHead");

describe("<Calendar />", () => {
  let testState: State;
  let mockStore: MockStoreEnhanced<Partial<CombinedState<State>>>;

  beforeEach(() => {
    testState = JSON.parse(JSON.stringify(initialState));
    mockStore = generateMockStore(testState);
  });

  it("renders dummy page without year to show set", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <Calendar />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly year to show and with subComponents mocked as string", () => {
    testState.localConfig.settings.yearToShow = 2020;
    const alteredMockStore = generateMockStore(testState);
    expect(alteredMockStore.getState().localConfig?.settings.yearToShow).toBe(2020);

    const tree = renderer
      .create(
        <Provider store={alteredMockStore}>
          <Calendar />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
