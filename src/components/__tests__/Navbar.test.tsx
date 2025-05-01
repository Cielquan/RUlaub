import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";
import Navbar from "../Navbar";

jest.mock("../DarkThemeSwitch", () => () => "DarkThemeSwitch");
jest.mock("../LanguageMenu", () => () => "LanguageMenu");
jest.mock("../UserButton", () => () => "UserButton");

describe("<Navbar />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with subComponents mocked as string", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <Navbar />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
