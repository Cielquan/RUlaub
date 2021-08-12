import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

import DarkThemeSwitch from "../DarkThemeSwitch";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";
import Languages from "../../i18n";

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

  it("renders tooltip", async () => {
    const { findByText, getByTestId } = render(
      <Provider store={mockStore}>
        <DarkThemeSwitch />
      </Provider>
    );
    expect(mockStore.getState().language).toEqual(Languages.english);
    fireEvent.mouseOver(getByTestId("theme-switch"));
    expect(
      await findByText(
        mockStore.getState().theme === "dark"
          ? "Activate Light Theme"
          : "Activate Dark Theme"
      )
    ).toBeInTheDocument();
  });
});
