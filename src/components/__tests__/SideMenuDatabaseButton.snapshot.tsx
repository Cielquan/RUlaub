import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import SideMenuDatabaseButton from "../SideMenuDatabaseButton";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock("../SideMenuButton", () => () => "SideMenuButton");
jest.mock(
  "../SideMenuDatabaseCreateButton",
  () => () => "SideMenuDatabaseCreateButton"
);
jest.mock(
  "../SideMenuDatabaseModifyButton",
  () => () => "SideMenuDatabaseModifyButton"
);

describe("SideMenuDatabaseButton component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with mocked subComponents", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <SideMenuDatabaseButton />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
