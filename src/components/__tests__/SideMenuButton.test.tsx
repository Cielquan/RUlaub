import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";
import SideMenuButton from "../SideMenuButton";

describe("<SideMenuButton />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <SideMenuButton text="text" onClick={() => undefined} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
