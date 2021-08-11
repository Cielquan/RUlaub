import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import SideMenuSectionButton from "../SideMenuSectionButton";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock("../SideMenuButton", () => () => "SideMenuButton");

describe("SideMenuSectionButton component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with mocked subComponents", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <SideMenuSectionButton text="text" listKey="key" sectionItemList={[]} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
