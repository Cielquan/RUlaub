import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import SideMenuInfoButton from "../SideMenuInfoButton";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock("../SideMenuButton", () => () => "SideMenuButton");

describe("SideMenuInfoButton component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with mocked subComponents", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <SideMenuInfoButton />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
