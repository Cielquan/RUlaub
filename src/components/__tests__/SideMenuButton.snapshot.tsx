import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import SideMenuButton from "../SideMenuButton";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

describe("SideMenuButton component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <SideMenuButton listKey="key" text="text" onClick={() => undefined} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
