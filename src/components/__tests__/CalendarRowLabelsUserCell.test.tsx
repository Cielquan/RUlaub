import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import CalendarRowLabelsUserCell from "../CalendarRowLabelsUserCell";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

describe("<CalendarRowLabelsUserCell />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <CalendarRowLabelsUserCell
            index={1}
            style={{ height: 1, left: 2, top: 3, width: 4 }}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
