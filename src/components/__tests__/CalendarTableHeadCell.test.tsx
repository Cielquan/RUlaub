import React from "react";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

import CalendarTableHeadCell from "../CalendarTableHeadCell";

describe("<CalendarTableHeadCell />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <CalendarTableHeadCell
          data={1}
          style={{ height: 1, left: 2, top: 3, width: 4 }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
