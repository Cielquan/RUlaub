import React from "react";
import renderer from "react-test-renderer";

import NewHolidayButton from "../NewHolidayButton";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

describe("NewHolidayButton component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<NewHolidayButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
