import React from "react";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";
import CalendarColumnLabelsMonth from "../CalendarColumnLabelsMonth";

jest.mock("../CalendarColumnLabelsMonthCell", () => () => "CalendarColumnLabelsMonthCell");
jest.mock("../multigridInnerElementType", () => () => "multigridInnerElementType");

describe("<CalendarColumnLabelsMonth />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with subComponents mocked as string", () => {
    const tree = renderer
      .create(<CalendarColumnLabelsMonth width={1} positionX={2} year={3} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
