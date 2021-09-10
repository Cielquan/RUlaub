import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

import CalendarColumnLabelsDayCell from "../CalendarColumnLabelsDayCell";

describe("<CalendarColumnLabelsDayCell />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <CalendarColumnLabelsDayCell
            columnIndex={1}
            rowIndex={1}
            data={new Date("2020-01-01")}
            style={{ height: 1, left: 2, top: 3, width: 4 }}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
