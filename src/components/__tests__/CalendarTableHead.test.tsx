import React from "react";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

import CalendarTableHead from "../CalendarTableHead";

jest.mock("../CalendarTableHeadCell", () => () => "CalendarTableHeadCell");
jest.mock("../multigridInnerElementType", () => () => "innerElementType");

describe("<CalendarTableHead />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with subComponents mocked as string", () => {
    const tree = renderer.create(<CalendarTableHead year={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
