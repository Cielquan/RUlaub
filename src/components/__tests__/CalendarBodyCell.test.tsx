import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import CalendarBodyCell from "../CalendarBodyCell";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

describe("<CalendarBodyCell />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <CalendarBodyCell
            columnIndex={1}
            rowIndex={1}
            style={{ height: 1, left: 2, top: 3, width: 4 }}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
