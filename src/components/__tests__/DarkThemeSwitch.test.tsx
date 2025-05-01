import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";
import DarkThemeSwitch from "../DarkThemeSwitch";

describe("<DarkThemeSwitch />", () => {
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
    render(
      <Provider store={mockStore}>
        <DarkThemeSwitch />
      </Provider>
    );
    userEvent.hover(screen.getByTestId("theme-switch"));
    expect(await screen.findByText("Activate Light Theme")).toBeInTheDocument();
  });
});
