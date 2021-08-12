import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import CalendarRowLabelsUser from "../CalendarRowLabelsUser";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock("../CalendarRowLabelsUserCell", () => () => "CalendarRowLabelsUserCell");
jest.mock("../multigridInnerElementType", () => () => "innerElementType");

describe("CalendarRowLabelsUser component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with string-mocked subComponents", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <CalendarRowLabelsUser height={1} positionY={2} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
