import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import DarkThemeSwitch from "../DarkThemeSwitch";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

describe("DarkThemeSwitch component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <DarkThemeSwitch />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
