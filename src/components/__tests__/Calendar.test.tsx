import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
// import { CombinedState } from "redux";
// import { MockStoreEnhanced } from "redux-mock-store";

import Calendar from "../Calendar";
import { initialState, State } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock("../CalendarColumnLabelsDay", () => () => "CalendarColumnLabelsDay");
jest.mock("../CalendarBody", () => () => "CalendarBody");
jest.mock("../CalendarColumnLabelsMonth", () => () => "CalendarColumnLabelsMonth");
jest.mock("../CalendarTableHead", () => () => "CalendarTableHead");
jest.mock("../CalendarRowLabelsUser", () => () => "CalendarRowLabelsUser");

describe("<Calendar />", () => {
  let testState: State;
  // let mockStore: MockStoreEnhanced<Partial<CombinedState<State>>>;

  beforeEach(() => {
    testState = JSON.parse(JSON.stringify(initialState));
    // mockStore = generateMockStore(testState);
  });

  it("renders correctly with subComponents mocked as string", () => {
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
