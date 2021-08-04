import React from "react";
import renderer from "react-test-renderer";

import CalendarColumnLabelsMonth from "../CalendarColumnLabelsMonth";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock(
  "../CalendarColumnLabelsMonthCell",
  () => () => "CalendarColumnLabelsMonthCell"
);
jest.mock("../multigridInnerElementType", () => () => "multigridInnerElementType");

describe("CalendarColumnLabelsMonth component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with mocked subComponents", () => {
    const tree = renderer
      .create(<CalendarColumnLabelsMonth width={1} positionX={2} year={3} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
