import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import Calendar from "../Calendar";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock("../CalendarColumnLabelsDay", () => () => "CalendarColumnLabelsDay");
jest.mock("../CalendarBody", () => () => "CalendarBody");
jest.mock("../CalendarColumnLabelsMonth", () => () => "CalendarColumnLabelsMonth");
jest.mock("../CalendarTableHead", () => () => "CalendarTableHead");
jest.mock("../CalendarRowLabelsUser", () => () => "CalendarRowLabelsUser");

describe("Calendar component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with string-mocked subComponents", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <Calendar />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
