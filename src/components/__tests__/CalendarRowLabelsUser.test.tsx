import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

import CalendarRowLabelsUser from "../CalendarRowLabelsUser";

jest.mock("../CalendarRowLabelsUserCell", () => () => "CalendarRowLabelsUserCell");
jest.mock("../multigridInnerElementType", () => () => "innerElementType");

describe("<CalendarRowLabelsUser />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with subComponents mocked as string", () => {
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
