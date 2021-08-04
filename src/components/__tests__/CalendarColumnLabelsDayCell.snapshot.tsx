import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import CalendarColumnLabelsDayCell from "../CalendarColumnLabelsDayCell";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

describe("CalendarColumnLabelsDayCell component", () => {
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
            data={new Date()}
            style={{ height: 1, left: 2, top: 3, width: 4 }}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
