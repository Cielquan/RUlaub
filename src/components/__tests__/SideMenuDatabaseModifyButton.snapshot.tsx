import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import SideMenuDatabaseModifyButton from "../SideMenuDatabaseModifyButton";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock("../SideMenuButton", () => () => "SideMenuButton");

describe("SideMenuDatabaseModifyButton component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with mocked subComponents", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <SideMenuDatabaseModifyButton />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
