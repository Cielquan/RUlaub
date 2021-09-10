import React from "react";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

import CalendarColumnLabelsDay from "../CalendarColumnLabelsDay";

jest.mock("../CalendarColumnLabelsDayCell", () => () => "CalendarColumnLabelsDayCell");
jest.mock("../multigridInnerElementType", () => () => "multigridInnerElementType");

describe("<CalendarColumnLabelsDay />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with subComponents mocked as string", () => {
    const tree = renderer
      .create(
        <CalendarColumnLabelsDay width={1} positionX={2} year={3} daysInYear={4} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
