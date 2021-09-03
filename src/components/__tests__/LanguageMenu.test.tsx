import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";

import LanguageMenu from "../LanguageMenu";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

describe("<LanguageMenu />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders button correctly", () => {
    render(
      <Provider store={mockStore}>
        <LanguageMenu />
      </Provider>
    );
    expect(screen.getByRole("button")).toMatchSnapshot();
  });

  it("does not render menu by default", () => {
    render(
      <Provider store={mockStore}>
        <LanguageMenu />
      </Provider>
    );
    expect(screen.queryByTestId("lang-menu")).not.toBeVisible();
  });

  // TODO:#i# fix test https://stackoverflow.com/q/69040036/16820192
  // it("renders menu correctly when opened and closed", () => {
  //   render(<LanguageMenu />);
  //   expect(screen.queryByTestId("lang-menu")).toBeNull();

  //   userEvent.click(screen.getByRole("button"));
  //   expect(screen.getByTestId("lang-menu")).toMatchSnapshot();
  //   expect(screen.getByTestId("lang-menu")).toBeVisible();

  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   // userEvent.click(screen.getByRole("presentation").firstChild);
  //   // userEvent.click(screen.getByTestId("lang-menu"));
  //   userEvent.click(screen.getByText("Menu Button"));

  //   expect(screen.queryByTestId("lang-menu")).toBeNull();
  // });
});
