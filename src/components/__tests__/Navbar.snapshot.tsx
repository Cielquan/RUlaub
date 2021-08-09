import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import Navbar from "../Navbar";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock("../DarkThemeSwitch", () => () => "DarkThemeSwitch");
jest.mock("../LanguageMenu", () => () => "LanguageMenu");

describe("Navbar component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
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
