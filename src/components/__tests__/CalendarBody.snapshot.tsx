import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import CalendarBody from "../CalendarBody";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock("../CalendarBodyCell", () => () => "CalendarBodyCell");
jest.mock("../multigridInnerElementType", () => () => "multigridInnerElementType");

describe("CalendarBody component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with string-mocked subComponents", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <CalendarBody
            width={1}
            height={2}
            positionX={1}
            positionY={2}
            scrollHandle={() => undefined}
            daysInYear={5}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
